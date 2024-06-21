
import shapeModel from '@/app/models/shape';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
try{
    await connectToDB();
    const data=await shapeModel.find();
    console.log(data)
    return NextResponse.json({ status: 200, error:data});


}catch(error){
    console.log("shape error occur",error.message);
    return NextResponse.json({ status: 300, error: [] +error.message});

}


}