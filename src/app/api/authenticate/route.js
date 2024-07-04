import bcrypt from 'bcrypt';
import NormalUser from '@/app/models/normalusers';
import { connectToDB } from '@/app/utils/database';

export const POST = async (req, res) => {
    const { email, password } = await req.json(); // Adjusted for Next.js 13+
    console.log(email, password)

    if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    try {
        // Connect to the database
        await connectToDB();
        console.log(email, password);
        console.log(NormalUser);

        // Find the user by email
        const user = await NormalUser.findOne({ email: email });

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'Incorrect email or password' }), { status: 401 });
        }

        // Compare the provided password with the stored hashed password
        // const isMatch = await bcrypt.compare(password, user.password);
        let isMatch;
        if (password == user.password) {
            isMatch = true;
        }


        if (!isMatch) {
            return new Response(JSON.stringify({ success: false, message: 'Incorrect email or password' }), { status: 401 });
        }

        // Authentication successful
        return new Response(JSON.stringify({ success: true, message: 'Sign in successful' }), { status: 300 });

    } catch (error) {
        console.error('Error authenticating user:', error);
        return new Response(JSON.stringify({ success: false, message: 'An error occurred while authenticating. Please try again later.' }), { status: 500 });
    }
};