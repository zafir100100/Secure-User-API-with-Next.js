import { loadUsers } from '@/../lib/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = 'your-secret-key';

export async function POST(req) {
    const { email, password } = await req.json();
    const users = await loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
        );
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json(
        { token },
        { status: 200 }
    );
}
