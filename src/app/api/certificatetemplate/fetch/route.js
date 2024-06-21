import certificateTemplate from '@/app/models/certificateTemplate';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const body = await req.json();
const {  id,templateGroup
    }=body;
    console.log(body)
await connectToDB();
try{
    let success;
if(templateGroup==true){

 success= await certificateTemplate.find({userId:id})
}
else{
    success = await certificateTemplate.find({userId:"admin"})
}
    console.log(success)
    
    return NextResponse.json({ status: 200, error: "certificate Uploaded Successfully" ,data:success});

}catch(error){
    console.log("certificateTemplate errror occur",error.message);
    return NextResponse.json({ status: 300, error: "Invalid Attempt" +error.message,data:[]});

}


}