
import shapeModel from '@/app/models/shape';
import GrpahicsModel from '@/app/models/usergraphics';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
try{
    const body =await req.json();
    const {id,img}=body;
    console.log(body)
    await connectToDB();

    const data=await GrpahicsModel.findOne({userId:id});
    if(data!=null){

        data.img.push(img)
        await GrpahicsModel.updateOne({userId:id},{img:data.img});
    }
    else{
        let arr=[img]
        await GrpahicsModel.create({userId:id,img:arr});
    }
    console.log(data)
    return NextResponse.json({ status: 200, error:"sucessfully fetch"});


}catch(error){
    console.log("shape error occur",error.message);
    return NextResponse.json({ status: 300, error: error.message,data:[]});

}


}