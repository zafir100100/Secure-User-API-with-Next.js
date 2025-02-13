import fs from 'fs-extra';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

const SECRET_KEY = 'your-secret-key';
const DB_PATH = 'db.json';

const validateSignature = (req) => {
    const signature = req.headers.get('X-Signature');
    const payload = req.body;

    if (!signature) {
        return false;
    }

    const hash = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(payload)
        .digest('hex');

    return signature === hash;
};

export async function POST(req) {
    const body = await req.json();

    if (!validateSignature(req)) {
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        );
    }

    try {
        const { eventType, data } = body;

        if (!eventType || !data) {
            return NextResponse.json(
                { error: 'Missing eventType or data' },
                { status: 400 }
            );
        }

        let db = [];

        try {
            db = await fs.readJson(DB_PATH);
        } catch (err) {
            db = [];
        }

        db.push({ eventType, data });
        await fs.writeJson(DB_PATH, db);

        return NextResponse.json(
            { success: true, message: 'Received' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Unable to process request' },
            { status: 500 }
        );
    }
}
