import folderModel from "@/app/models/userFolders";
import { NextResponse } from "next/server";

export async function POST(req,res){
const body=await req.json();
const {id,password}=body
try{
    const data = await folderModel.findOne({_id:id});
if(data.password==password){
    return NextResponse.json({ status: 200, error:"Login Successfully"});
}
return NextResponse.json({ status: 400, error:"invalid Password"});

}catch(error){

    return NextResponse.json({ status: 404, error:"Error Occur"});

}
}