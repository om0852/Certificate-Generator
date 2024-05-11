import lastSessionData from '@/app/models/lastSessionData';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const body = await req.json();
const {  userID,
    certificateComponentData,
    backgroundImage}=body;
await connectToDB();
try{

    const success = await lastSessionData.create({
        userId:userID,
        certificateComponentData:certificateComponentData,
        backgroundImage:backgroundImage
        
    })
    
    return NextResponse.json({ status: 300, error: "certificate Uploaded Successfully" });

}catch(error){
    console.log("certificateTemplate errror occur");
    return NextResponse.json({ status: 300, error: "Invalid Attempt" +error.message});

}


}