"use client"
import { useEffect, useState } from "react";
import SideTemplate from "../component/SideTemplate";
import Slider from "../component/Slider";
import "@/app/globals.css"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from "react-toastify";

import Link from "next/link";
import AddProjectName from "../component/card/AddProjectName";

export default function ChooseTemplate() {
    const [prevImage, setPrevImage] = useState("");
    const [projectName,setProjectName]=useState("")
    const CreateCertificatetemplate=async()=>{
  
            const res1 = await fetch(`http://localhost:3000/api/addCertificateTemplate`, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({id:"om",certificateComponentData:[],backgroundImage:prevImage,certificateName:projectName}),
            });
          const response = await res1.json();
          if(response.status==404){
            toast.error(response.error, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          }
          }
          
          
    
    return (
        <>
            <SideTemplate setPrevImage={setPrevImage} />
            <div style={{ display: "grid", placeItems: "center", width: "70%", height: "100vh" }} className="main-container">{prevImage ? <> <img style={{ width: "inherit", }} src={prevImage} /><div className="flex items-start mb-5">
            <div className="">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Project Name</label>
    <input onChange={(e)=>{setProjectName(e.target.value)}} value={projectName} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paper Presentation" required />
  </div>

  </div>
{projectName && <Link onClick={CreateCertificatetemplate} href={`/customizetemplate?id=${projectName}`} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Use Template</Link>
}            </> : <h2 style={{ textAlign: "center", color: "black", fontWeight:"bold",fontSize: "4em" }}>Select Template</h2>}</div >
        </>

    )
}