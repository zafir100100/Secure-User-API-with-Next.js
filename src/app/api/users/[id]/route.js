import { loadUsers } from '@/../lib/db';

export async function GET({ params }) {
    const { id } = params;

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
