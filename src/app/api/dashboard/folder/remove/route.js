import folderModel from "@/app/models/userFolders";
import { NextResponse } from "next/server";

export async function POST(req,res){
const body=await req.json();
const {id,certificateId}=body;
try{
await folderModel.updateOne({_id:id},  { $addToSet: { projectId: certificateId } }
);
return NextResponse.json({ status: 201, error:"Add Successfully "});

}catch(error){

    return NextResponse.json({ status: 404, error:"Error Occur"});

}
}