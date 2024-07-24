import { NextRequest, NextResponse } from 'next/server';
import { decrypt, encrypt } from './lib';

export async function middleware(request) {
    const session = request.cookies.get('session')?.value;
    if (!session) {
        console.log("No session found. Proceeding to the next middleware.");
        return NextResponse.next();
    }

    const parsed = await decrypt(session);
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = Math.floor(new Date(parsed.expires).getTime() / 1000);
    const timeLeft = expiresAt - now;

    console.log("Current time:", now);
    console.log("Session expires at:", expiresAt);
    console.log("Time left:", timeLeft, "seconds");

    // Update session only if it's about to expire in less than 5 seconds
    if (timeLeft > 5) {
        console.log("Session has more than 5 seconds left. Proceeding to the next middleware.");
        return NextResponse.next();
    }

    console.log("Session is about to expire. Updating the session.");
    parsed.expires = new Date(Date.now() + 10 * 1000); // Extend session by 10 seconds
    const response = NextResponse.next();
    const encryptedSession = await encrypt(parsed);

    response.cookies.set({
        name: 'session',
        value: encryptedSession,
        httpOnly: true,
        expires: parsed.expires,
    });

    console.log("Updated session cookie with value:", encryptedSession);
    return response;
}
