import certificateTemplate from '@/app/models/certificateTemplate';
import NormalUser from '@/app/models/normalusers';
import User from '@/app/models/users';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
    try {
        await connectToDB();
        
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name') || "";
        const query = {
            $or: [
                { email: new RegExp(name, 'i') },
            ]
        };

        const users = await User.find(query);
        const normalUsers = await NormalUser.find(query);

        const allUsers = [...users, ...normalUsers];

        return NextResponse.json({ status: 200, message: "Users fetched successfully", data: allUsers });

    } catch (error) {
        return NextResponse.json({ status: 500, message: "Invalid Attempt: " + error.message });
    }
}
