import certificateTemplate from '@/app/models/certificateTemplate';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        const body = await req.json();
        const { pid, id } = body;
        console.log(body);

        await connectToDB();

        // Find the certificateTemplate by pid
        const template = await certificateTemplate.findById(pid);

        if (!template) {
            return NextResponse.json({ status: 404, error: "Template not found" });
        }

        // Check if the email already exists in the ownership array
        const emailExists = template.ownership.some(owner => owner.email === id);

        if (emailExists) {
            return NextResponse.json({ status: 409, error: "Email already exists in ownership" });
        }

        // Update the ownership array
        template.ownership.push({ type: "shared", email: id });
        await template.save();

        return NextResponse.json({ status: 200, message: "Project shared successfully" });

    } catch (error) {
        console.log("Error occurred in certificateTemplate:", error.message);
        return NextResponse.json({ status: 500, error: "Invalid Attempt: " + error.message });
    }
}
