import { NextResponse } from 'next/server';
import crypto from 'crypto';

const secret = 'your-secret-key';

export async function POST(req) {
    try {
        const body = await req.json();
        const payloadString = JSON.stringify(body);

        const signature = crypto
            .createHmac('sha256', secret)
            .update(payloadString)
            .digest('hex');

        return NextResponse.json(
            { signature },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Unable to generate signature' },
            { status: 500 }
        );
    }
}
