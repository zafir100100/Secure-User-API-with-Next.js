import { loadUsers, saveUsers } from '@/../lib/db';
import { authenticate } from '@/../lib/authMiddleware';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const authResponse = authenticate(req);
    if (authResponse) return authResponse;

    try {
        const users = await loadUsers();
        return NextResponse.json(users, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Unable to fetch users' },
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const users = await loadUsers();
        const newUser = { id: users.length + 1, name, email, password };
        users.push(newUser);
        await saveUsers(users);

        return NextResponse.json(newUser, {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Unable to create user' },
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
