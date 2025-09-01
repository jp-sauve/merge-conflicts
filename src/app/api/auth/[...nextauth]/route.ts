import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { runQuery } from '@/lib/db';
import bcrypt from 'bcrypt';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const users = await runQuery('SELECT * FROM users WHERE username = ?', [credentials.username]) as any[];

        if (users.length > 0) {
          const user = users[0];
          const isValid = await bcrypt.compare(credentials.password, user.password_hash);
          if (isValid) {
            return { id: user.id, name: user.username, role: user.role };
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'a-default-secret-for-dev',
});

export { handler as GET, handler as POST };