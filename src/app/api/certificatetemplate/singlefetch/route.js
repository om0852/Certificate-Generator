import certificateTemplate from '@/app/models/certificateTemplate';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const body = await req.json();
try{
await connectToDB()
    const data=await certificateTemplate.findOne({userId:body.id,certificateName:body.certificateName})
    if(data==null){
        return NextResponse.json({ status: 404, error: "Invalid Data" ,data:[]});

    }
    return NextResponse.json({ status: 200, error: "fetch successfully" ,data:data});
}catch(error){
    return NextResponse.json({ status: 404, error: "Invalid Data" ,data:[]});

}

}