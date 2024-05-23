'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function AuthComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Check if email and password are provided
        if (!email || !password) {
            setError('Please provide both email and password.');
            return;
        }

        try {
            // Query the database to find the user with the provided email and password
            const response = await fetch('/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            const data = await response.json();

            // If user is found, sign in
            if (data.success) {
                await signIn('credentials', {
                    email,
                    password,
                    redirect: false
                });
            } else {
                // If user is not found, display error message
                setError('Incorrect email or password.');
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            setError('An error occurred while authenticating. Please try again later.');
        }
    }

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-400" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-400" />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign In</button>
            </form>
            <button onClick={() => signIn('google')} className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Sign In with Google</button>
        </div>
    );
}
