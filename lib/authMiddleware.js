import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export const authenticate = (req) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return new Response(
            JSON.stringify({ error: 'Authorization token is missing' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Invalid or expired token' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
