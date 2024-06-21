
import shapeModel from '@/app/models/shape';
import GrpahicsModel from '@/app/models/usergraphics';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
try{
    await connectToDB();
    const body=await req.json();

    const data=await GrpahicsModel.findOne({userId:body.id});
    console.log(data)
    return NextResponse.json({ status: 200, error:"sucessfully fetch",data:data.img});


}catch(error){
    console.log("shape error occur",error.message);
    return NextResponse.json({ status: 300, error: error.message,data:[]});

}


}