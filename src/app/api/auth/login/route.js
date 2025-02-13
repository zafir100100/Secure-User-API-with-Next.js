import { loadUsers } from '@/../lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export async function POST(req) {
    const { email, password } = await req.json();
    const users = await loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return new Response(
            JSON.stringify({ error: 'Invalid email or password' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return new Response(
        JSON.stringify({ token }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}
