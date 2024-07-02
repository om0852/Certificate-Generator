import folderModel from "@/app/models/userFolders";
import { NextResponse } from "next/server";

export async function POST(req,res){
const body=await req.json();
try{
    const data = await folderModel.findOne({folderName:body.folderName});
if(data==null){
    await folderModel.create(body);
    return NextResponse.json({ status: 201, error:"Create Successfully "});
}
return NextResponse.json({ status: 201, error:"Folder Name Already Exist "});

}catch(error){

    return NextResponse.json({ status: 404, error:"Error Occur"});

}
}