import certificateTemplate from '@/app/models/certificateTemplate';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const body = await req.json();
const {  id,
    certificateComponentData,backgroundImage
    }=body;
    console.log(body)
await connectToDB();
try{

    const success = await certificateTemplate.create({
        userId:id,
        certificateComponentData:certificateComponentData,    
        backgroundImg:backgroundImage    
    })
    
    return NextResponse.json({ status: 200, error: "certificate Uploaded Successfully" });

}catch(error){
    console.log("certificateTemplate errror occur",error.message);
    return NextResponse.json({ status: 300, error: "Invalid Attempt" +error.message});

}


}