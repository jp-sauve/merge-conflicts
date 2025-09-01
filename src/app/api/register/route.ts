import { runQuery } from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const users = await runQuery('SELECT * FROM users', []) as any[];
    const role = users.length === 0 ? 'admin' : 'user';

    const existingUser = await runQuery('SELECT * FROM users WHERE username = ?', [username]) as any[];
    if (existingUser.length > 0) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();

    await runQuery('INSERT INTO users (id, username, password_hash, role) VALUES (?, ?, ?, ?)', [id, username, password_hash, role]);

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
