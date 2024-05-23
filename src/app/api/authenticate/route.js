import bcrypt from 'bcrypt';
import User from '@/app/models/normalusers';
import { connectToDB } from '@/app/utils/database';

export const POST = async (req, res) => {
    const { email, password } = await req.json(); // Adjusted for Next.js 13+

    if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    try {
        // Connect to the database
        await connectToDB();

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'Incorrect email or password' }), { status: 401 });
        }

        // Compare the provided password with the stored hashed password
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = true;

        if (!isMatch) {
            return new Response(JSON.stringify({ success: false, message: 'Incorrect email or password' }), { status: 401 });
        }

        // Authentication successful
        return NextResponse.json({ status: 300, error: "certificate Uploaded Successfully" });

    } catch (error) {
        console.error('Error authenticating user:', error);
        return new Response(JSON.stringify({ success: false, message: 'An error occurred while authenticating. Please try again later.' }), { status: 500 });
    }
};
