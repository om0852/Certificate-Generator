'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function AuthComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // Make sure this is inside the functional component
    const router = useRouter();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please provide both email and password.');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }).then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const router = useRouter();
                        router.replace('/')
                    }
                });
            // console.log(response)
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            const data = await response.json();

            if (data.success) {

<<<<<<< HEAD


                const router = useRouter();
                // console.log("reponse ok")
                router.replace('/');

=======
                if (data.message == "Sign in successful") {
                    const router = useRouter();
                    // console.log("reponse ok")
                    router.push('/');
                } else {
                    setError('Failed to sign in after sign up.');
                }
>>>>>>> 756f05a917e7cc2880b1f6babe06a1f03888042e
            } else {
                setError('Incorrect email or password.');
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            setError('An error occurred while authenticating. Please try again later.');
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please provide both email and password.');
            return;
        }

        try {
            const response = await fetch('/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
<<<<<<< HEAD
            })

            if (response) {
                console.log('response')
            }
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }
=======
            });
            
>>>>>>> 756f05a917e7cc2880b1f6babe06a1f03888042e

            const data = await response.json();
            if (data.success) {
<<<<<<< HEAD
                console.log('data success');

                const router = useRouter();
                // console.log("response ok")

                router.replace('/');
=======
                // const signInResponse = await signIn('credentials', {
                    //     email,
                    //     password,
                    //     redirect: false
                    // });
                    if (data.message == "Sign in successful") {
                    console.log(data)
                    // console.log("response ok")
>>>>>>> 756f05a917e7cc2880b1f6babe06a1f03888042e

            } else {
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
            <button type="submit" onClick={handleSignUp} className="w-full my-3 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
        </div>
    );
}
