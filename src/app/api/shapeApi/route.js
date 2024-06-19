import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
try{
    const directoryPath = path.join(process.cwd(), 'shape'); // Path to your images folder
    const files = await fs.promises.readdir(directoryPath);

   console.log(files)
    
    return NextResponse.json({ status: 300, error:files});

}catch(error){
    console.log("certificateTemplate errror occur");
    return NextResponse.json({ status: 300, error: "Invalid Attempt" +error.message});

}


}