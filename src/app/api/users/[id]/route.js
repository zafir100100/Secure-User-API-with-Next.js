import { loadUsers } from '@/../lib/db';
import { authenticate } from '@/../lib/authMiddleware';

export async function GET(req, { params }) {
    const authResponse = authenticate(req);
    if (authResponse) return authResponse;

    const { id } = await params;

    try {
        const users = await loadUsers();
        const user = users.find(u => u.id === parseInt(id));

        if (!user) {
            return new Response(
                JSON.stringify({ error: 'User not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Unable to fetch user' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
