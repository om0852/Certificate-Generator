import certificateTemplate from '@/app/models/certificateTemplate';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function DELETE(req, res) {
    const body = await req.json();
try{
await connectToDB()
    const data=await certificateTemplate.deleteOne({userId:body.id,certificateName:body.certificateName})
    if(data==null){
        return NextResponse.json({ status: 404, error: "Invalid Data" ,data:null});

    }
    return NextResponse.json({ status: 204, error: "Delete Successfully" ,data:data});
}catch(error){
    return NextResponse.json({ status: 404, error: "Invalid Data" ,data:null});

}

}
