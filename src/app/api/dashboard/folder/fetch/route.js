import certificateTemplate from "@/app/models/certificateTemplate";
import folderModel from "@/app/models/userFolders";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req,res){
const body=await req.json();
const {id,certificateId}=body;
try{
    let arr=[]
const data = await folderModel.findOne({_id:id});
for(let i=0;i<data.projectId.length;i++){

    const data1=await certificateTemplate.findById(data.projectId[i]);
    arr.push(data1);
}
return NextResponse.json({ status: 201, error:"Add Successfully ",data:arr});

}catch(error){
console.log(error.message)
    return NextResponse.json({ status: 404, error:"Error Occur"});

}
}