import certificateTemplate from "@/app/models/certificateTemplate";
import folderModel from "@/app/models/userFolders";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req,res){
const body=await req.json();
const {id}=body;
try{
    console.log(body)
const data = await folderModel.find({userId:id});
return NextResponse.json({ status: 201, error:"Add Successfully ",data:data});

}catch(error){
console.log(error.message)
    return NextResponse.json({ status: 404, error:"Error Occur"});

}
}