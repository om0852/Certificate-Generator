"use client"
import { useEffect, useState } from "react"
import "@/css/form.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/app/component/Navbar";
// import Header from "@/app/component/Header";

export default function Page() {
   
    const [productData, setProductData] = useState({
        img:"",
        title: "",
        });
    
const handleAddProduct=async()=>{
    if(productData.img.length==0){
        toast.error('Add Atleast One Image', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });    }
    else if(productData.title==""){
        toast.error('Enter  Product Name', {
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
    else{

        const res = await fetch(`http://localhost:3000/api/adminpanel/addshape`, {
            method: "POST",
            headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({img:productData.img,title:productData.title}),
    });
        const response=await res.json();
        if(response.status==200){
            toast.success(' Upload Successfully', {
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
        else{
            toast.error('Check Internet Connection', {
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
}

    const handleSetData = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setProductData(prev => ({ ...prev, [name]: value }));
        console.log(productData)
    }
    const handlePic = async (e) => {
        const filedata = e.target.files[0];
        console.log(e.target.files[0])
        const data = new FormData();
        data.append("file", filedata);
        data.append("upload_preset", "gsceswka");
        data.append("cloud_name", "dge7wv4zo");

        await fetch("https://api.cloudinary.com/v1_1/dge7wv4zo/image/upload", {
            method: "post",
            body: data
        })
            .then((res) => {
                res.json().then((data) => {
                    setProductData(prev=>({...prev,img:data.url}));
                })
            }).catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <div className="addproduct-container">
                <Navbar/>
                <div className="addproduct-form-container">


                    <div className="addproduct-form">
                    <div className="addproduct-title" style={{marginBottom:10}}>Add Shape</div>

                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
{productData.img &&    <img  width={"40"} height={"40"} src={productData.img}/>
}</div>
                 <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>

<label style={{width:"45vh",
    height:"8vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    background:"red",
    color:"white",
    marginTop:"4vh"
}} htmlFor="uploadimg">Upload Product Image</label>
<input onChange={handlePic} hidden id="uploadimg" type="file" accept="image/*" />
</div>

                            <div className="input-container">
                                <h3>Product Name:</h3>
                                <input value={productData.title} name="title" onChange={(e) => handleSetData(e)} className="addproduct-input" />
                            </div>
                                                        <button style={{width:"45vh",
    height:"8vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    background:"green",
    color:"white",
    marginTop:"4vh"
}} onClick={handleAddProduct}>Update Product</button>
                            </div>
                </div>
            </div>
        </>
    )
}