import { runQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const game = await runQuery('SELECT * FROM games WHERE id = ?', [params.id]);
    const participants = await runQuery('SELECT u.id, u.username, gp.role FROM users u JOIN game_participants gp ON u.id = gp.user_id WHERE gp.game_id = ?', [params.id]);
    return NextResponse.json({ game: game[0], participants }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, description, image_url, status } = await req.json();
    await runQuery('UPDATE games SET title = ?, description = ?, image_url = ?, status = ? WHERE id = ?', [title, description, image_url, status, params.id]);
    return NextResponse.json({ message: 'Game updated' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId, role } = await req.json();
    await runQuery('INSERT INTO game_participants (game_id, user_id, role) VALUES (?, ?, ?)', [params.id, userId, role]);
    return NextResponse.json({ message: 'Participant added' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
