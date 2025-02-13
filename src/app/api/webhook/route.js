import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { loadUsers, saveUsers } from '@/../lib/db';
import { cp } from 'fs';

const secret = 'your-secret-key';

const validateSignature = async (req) => {
    const signature = req.headers.get('X-Signature');

    if (!signature) {
        return false;
    }

    // Read the request body as a string (exactly as in the generator)
    const body = await req.json();
    const payloadString = JSON.stringify(body);

    const hash = crypto
        .createHmac('sha256', secret)
        .update(payloadString)
        .digest('hex');

    return signature === hash;
};

export async function POST(req) {
    if (!await validateSignature(req)) {
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        );
    }

    try {
        const body = await req.json();
        const { eventType, data } = body;

        if (!eventType || !data) {
            return NextResponse.json(
                { error: 'Missing eventType or data' },
                { status: 400 }
            );
        }

        const users = await loadUsers();
        users.push({ eventType, data });
        await saveUsers(users);

        return NextResponse.json(
            { success: true, message: 'Received' },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Unable to process request' },
            { status: 500 }
        );
    }
}
