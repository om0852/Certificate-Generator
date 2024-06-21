
import shapeModel from '@/app/models/shape';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
try{
    const body=await req.json();
    await connectToDB()
    console.log(body)
    await shapeModel.create({img:body.img,title:body.title});
    return NextResponse.json({ status: 300, error:"done"});

}catch(error){
    return NextResponse.json({ status: 300, error: "Invalid Attempt" +error.message});

}


}