import { loadUsers } from '@/../lib/db';
import { authenticate } from '@/../lib/authMiddleware';

export async function GET(req) {
    const authResponse = authenticate(req);
    if (authResponse) return authResponse;

    try {
        const users = await loadUsers();
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Unable to fetch users' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const users = await loadUsers();
        const newUser = { id: users.length + 1, name, email, password };
        users.push(newUser);
        await saveUsers(users);

        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Unable to create user' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
