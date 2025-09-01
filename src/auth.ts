import NextAuth, { type DefaultSession, NextAuthOptions } from 'next-auth';
import { ZodError } from 'zod';
import { signInSchema } from '@/lib/zod';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { runQuery } from '@/lib/db';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}

export const config: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { username, password } = await signInSchema.parseAsync(
          credentials,
        );
        const users = (await runQuery(
          'SELECT * FROM users WHERE username = ?',
          [credentials.username],
        )) as any[];

        if (users.length > 0) {
          const user = users[0];
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password_hash,
          );
          if (isValid) {
            return { id: user.id, name: user.username, role: user.role };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'a-default-secret-for-dev',
} as const;
