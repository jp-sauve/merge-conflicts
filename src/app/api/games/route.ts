import { runQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const games = await runQuery('SELECT * FROM games', []);
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, image_url } = await req.json();
    const id = crypto.randomUUID();
    const status = 'created';

    await runQuery('INSERT INTO games (id, title, description, image_url, status) VALUES (?, ?, ?, ?, ?)', [id, title, description, image_url, status]);

    return NextResponse.json({ message: 'Game created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
