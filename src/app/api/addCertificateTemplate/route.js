import certificateTemplate from '@/app/models/certificateTemplate';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const body = await req.json();
const {  id,
    certificateComponentData,backgroundImage,certificateName,state
    }=body;
    console.log(body)
await connectToDB();
try{
const data= await certificateTemplate.findOne({userId:id,certificateName:certificateName});

if(data==null){
    if(state=="edit"){
        return NextResponse.json({ status: 404, error: "Project Doesn't Exist" });

    }
    const success = await certificateTemplate.create({
        userId:id,
        certificateComponentData:certificateComponentData,    
        backgroundImg:backgroundImage    ,
        certificateName:certificateName
    })
    
}

else{
    
        const success = await certificateTemplate.updateOne(
            {_id:data._id},{
                certificateComponentData:certificateComponentData,    
                backgroundImg:backgroundImage    
            })
    
}
    return NextResponse.json({ status: 200, error: "Certificate Uploaded Successfully" });

}catch(error){
    console.log("certificateTemplate errror occur",error.message);
    return NextResponse.json({ status: 300, error: "Invalid Attempt" +error.message});

}


}