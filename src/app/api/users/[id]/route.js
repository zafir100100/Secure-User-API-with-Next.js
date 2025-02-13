import { loadUsers } from '@/../lib/db';
import { authenticate } from '@/../lib/authMiddleware';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const authResponse = authenticate(req);
    if (authResponse) return authResponse;

    const { id } = await params;

    try {
        const users = await loadUsers();
        const user = users.find(u => u.id === parseInt(id));

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Unable to fetch user' }, { status: 500 });
    }
}
