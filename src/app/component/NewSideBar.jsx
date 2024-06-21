"use client"
import { useState,useEffect, useRef } from "react";
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import addImageIcon from "../../images/addimage.png"
import "@/css/form.css"
import "./component.css"
import 'react-toastify/dist/ReactToastify.css';

import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";

import { ToastContainer,toast } from "react-toastify";

const NewSideBar=({
    addFields,
    handleTextFieldChange,
    textFields,
    downloadCertificate,
    setTextFields,
    handleRadioChange,
    selectedTextFieldIndex,
    handleImageChange,
    certificateRef,
    imageBorder,
    setImageBorder,
    handleHistoryComponent

})=>{
  const printRef=useRef()
const [showMenu,setMenu]=useState(false);
const [menuData,setMenuData]=useState("");

const [asyncTracker, setAsyncTracker] = useState(0);

const [selectedImageData, setSelectedImageData] = useState(null);
const [shapeData,setShapeData]=useState(null);

const handleImageData = (e, i) => {
  setSelectedImageData({ x: e.clientX, y: e.clientY, index: i })

}


const [imageNames, setImageNames] = useState([]);

useEffect(() => {
  if(menuData=="Shape"){
    handleShapeData();
  }
  }, [menuData]);
useEffect(()=>{
console.log(imageNames)
},[imageNames])

useEffect(() => {
  if (asyncTracker != 0) {
    handleHistoryComponent();
    console.log(textFields)
  }
}, [asyncTracker])


// const generateAndSavePDF = async (printIframe) => {
//   // Capture the content of the iframe
//   const doc = new jsPDF('l', 'mm', 'a4');
//   doc.html(printIframe.contentDocument.body, {
//     callback: function (pdf) {
//       pdf.save('certificate.pdf');
//     },
//     x: 40,
//     y: 0,
//     page:1
//   });
// };
const handleDownloadImage1 = () => {
  html2canvas(certificateRef.current, {
    scale: 1.25, // Adjust scale if needed
  }).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.98); // Use 'image/png' if you prefer PNG format
    link.download = 'myfile.jpg'; // Change the filename and extension as needed
    link.click();
  });
};
const handleDownloadImage2 = () => {
  html2canvas(certificateRef.current, {
    scale: 1.25, // Adjust scale if needed
  }).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 0.98); // Use 'image/png' if you prefer PNG format
    link.download = 'myfile.png'; // Change the filename and extension as needed
    link.click();
  });
};
const handlePrint1=()=>{
  var opt = {
    margin:       [0, 0, 0, 2], // Array for top, right, bottom, and left margins
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    jsPDF:        { unit: 'mm', format: [674,464], orientation: 'landscape' }
  };
   
  // New Promise-based usage:
  html2pdf().from(certificateRef.current).set(opt).save();
}
const handlePrint2 = useReactToPrint({
  content: () => certificateRef.current,
documentTitle:"done",
onAfterPrint:()=>{console.log("printing done")},

removeAfterPrint:true
});

const handleAddImage = (event, i) => {
  const updatedImageField = [...textFields];
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = () => {
      const imageSrc = reader.result;
      if (i == -1) {
        // Push new image object to updatedImageField
        updatedImageField.push({ src: imageSrc, x: 100, y: 100, width: 100, height: 100, z_index: 100, transparency: 100, type: "image", isLocked: false });
      }
      else {
        updatedImageField[i].src = imageSrc;
      }

      // Update state with updatedImageField
      setTextFields(updatedImageField);
      handleHistoryComponent(updatedImageField);

    };

    // Start reading the file as a data URL
    reader.readAsDataURL(file);
  } else {
    // Handle invalid file type
    // setSelectedImage(null);
  }
  setSelectedImageData(null);

};
const handleAddShape=(imageSrc)=>{
const updatedata=[...textFields];
updatedata.push({ src: imageSrc, x: 100, y: 100, width: 100, height: 100, z_index: 100, transparency: 100, type: "image", isLocked: false });
setTextFields(updatedata)
handleHistoryComponent(updatedata)
}

const handleShapeData=async()=>{
  console.log("run")
  const res = await fetch(`http://localhost:3000/api/shape`, {
    method: "GET",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
const response = await res.json();
setShapeData(response.error)
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
          res.json().then(async(data) => {
            console.log(data.url)
            const res1 = await fetch(`http://localhost:3000/api/graphics/add`, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({id:"om",img:data.url}),
            });
          const response = await res1.json();
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
   
        })
      }).catch((error) => {
          console.log(error);
      })
}


// const handlePrint = () => {
//   printRef.current.handlePrint();
// };
    return(
        <>    
        <ToastContainer/>
     <div style={{width:'15vh',height:"100vh",background:"white",zIndex:1501,boxShadow:"rgba(64, 87, 109, 0.07) 0px 0px 0px 1px, rgba(53, 71, 90, 0.2) 0px 2px 12px" }}>
        <div className="sidebar-icon" onClick={(e)=>{setMenu(true);setMenuData("Template")}}>   
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v40H40V56ZM40 112h56v88H40Zm176 88H112v-88h104v88Z"></path></svg>
              Template
</div>
        <div  onClick={(e)=>{setMenu(true);setMenuData("Text")}} className="sidebar-icon">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M208 56v32a8 8 0 0 1-16 0V64h-56v128h24a8 8 0 0 1 0 16H96a8 8 0 0 1 0-16h24V64H64v24a8 8 0 0 1-16 0V56a8 8 0 0 1 8-8h144a8 8 0 0 1 8 8Z"></path></svg>              
        Text
</div>
        <div   onClick={(e)=>{setMenu(true);setMenuData("Shape")}} className="sidebar-icon">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm0 176H48V48h160v160Z"></path></svg>              
        Shape
    
<div>

</div>

</div>
        <div  onClick={(e)=>{setMenu(true);setMenuData("Image")}} className="sidebar-icon">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52 80 80H40Zm176 28h-21.37l-36-36 20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12 12 12 0 0 1-12-12Z"></path></svg>
        Image
        </div>
        
        <div  onClick={(e)=>{setMenu(true);setMenuData("My Graphics")}} className="sidebar-icon">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M192 116a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm-40-52h-40a8 8 0 0 0 0 16h40a8 8 0 0 0 0-16Zm96 48v32a24 24 0 0 1-24 24h-2.36l-16.21 45.38A16 16 0 0 1 190.36 224h-12.72a16 16 0 0 1-15.07-10.62l-1.92-5.38h-57.3l-1.92 5.38A16 16 0 0 1 86.36 224H73.64a16 16 0 0 1-15.07-10.62L46 178.22a87.69 87.69 0 0 1-21.44-48.38A16 16 0 0 0 16 144a8 8 0 0 1-16 0 32 32 0 0 1 24.28-31A88.12 88.12 0 0 1 112 32h104a8 8 0 0 1 0 16h-21.39a87.93 87.93 0 0 1 30.17 37c.43 1 .85 2 1.25 3A24 24 0 0 1 248 112Zm-16 0a8 8 0 0 0-8-8h-3.66a8 8 0 0 1-7.64-5.6A71.9 71.9 0 0 0 144 48h-32a72 72 0 0 0-53.09 120.64 8 8 0 0 1 1.64 2.71L73.64 208h12.72l3.82-10.69a8 8 0 0 1 7.53-5.31h68.58a8 8 0 0 1 7.53 5.31l3.82 10.69h12.72l18.11-50.69A8 8 0 0 1 216 152h8a8 8 0 0 0 8-8Z"></path></svg>
        My Graphics
        </div>
      
        {/* <div  onClick={(e)=>{setMenu(false);handlePrint2()}} className="sidebar-icon">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M192 116a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm-40-52h-40a8 8 0 0 0 0 16h40a8 8 0 0 0 0-16Zm96 48v32a24 24 0 0 1-24 24h-2.36l-16.21 45.38A16 16 0 0 1 190.36 224h-12.72a16 16 0 0 1-15.07-10.62l-1.92-5.38h-57.3l-1.92 5.38A16 16 0 0 1 86.36 224H73.64a16 16 0 0 1-15.07-10.62L46 178.22a87.69 87.69 0 0 1-21.44-48.38A16 16 0 0 0 16 144a8 8 0 0 1-16 0 32 32 0 0 1 24.28-31A88.12 88.12 0 0 1 112 32h104a8 8 0 0 1 0 16h-21.39a87.93 87.93 0 0 1 30.17 37c.43 1 .85 2 1.25 3A24 24 0 0 1 248 112Zm-16 0a8 8 0 0 0-8-8h-3.66a8 8 0 0 1-7.64-5.6A71.9 71.9 0 0 0 144 48h-32a72 72 0 0 0-53.09 120.64 8 8 0 0 1 1.64 2.71L73.64 208h12.72l3.82-10.69a8 8 0 0 1 7.53-5.31h68.58a8 8 0 0 1 7.53 5.31l3.82 10.69h12.72l18.11-50.69A8 8 0 0 1 216 152h8a8 8 0 0 0 8-8Z"></path></svg>
        Print
        </div> */}
        <div   onClick={(e)=>{setMenu(true);setMenuData("Download");}} className="sidebar-icon">   
        <img width="30" height="30" src="https://img.icons8.com/material-outlined/24/download--v1.png" alt="download--v1"/>        Download
        </div>
        
      <div className="sidebar-icon">
      {/* Optional: Another button that triggers the print function */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h48a8 8 0 0 1 0 16H32v64h192v-64h-48a8 8 0 0 1 0-16h48a16 16 0 0 1 16 16ZM85.66 77.66 120 43.31V128a8 8 0 0 0 16 0V43.31l34.34 34.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32ZM200 168a12 12 0 1 0-12 12 12 12 0 0 0 12-12Z"></path></svg>
               Upload
        </div>
     </div>
     <div className="sidebar-menu" style={{left:showMenu==true?"14vh":"-30vh",top:"54px"}}>
<div style={{width:"100%",height:"5vh",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1vh 2vh"}}>{menuData}<img style={{cursor:"pointer"}} onClick={(e)=>{setMenu(false);setMenuData("")}} width="30" height="30" src="https://img.icons8.com/material-outlined/24/multiply--v1.png" alt="multiply--v1"/></div>
<div style={{width:"100%",height:"100%",marginTop:"2vh",}}>
{menuData=="Text" ?
<>
<button className='rounded' style={{ margin: "1vh auto", position: "relative", left: "5%", width: "90%", height: "40px", background: "khaki" }} onClick={() => addFields()}>Add Field</button>
<div style={{width:"100%",height:"100%",overflowY:"scroll",scrollbarWidth:"none"}}>

{textFields &&
          textFields.map((data, index) => {
            if (data.type == "textfield") {
              return (
                <div key={index}
                  style={{ display: 'flex', alignItems: "center" }}>
                  <svg onClick={() => {
                    const updatedImageField = [...textFields];
                    if (updatedImageField.length > 1) {
                      updatedImageField.splice(index, 1)
                      setTextFields(updatedImageField)
                    }
                    else {
                      alert("1 field mantatory")
                    }

                  }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                    <linearGradient id="nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1" x1="18.405" x2="33.814" y1="10.91" y2="43.484" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#32bdef"></stop><stop offset="1" stopColor="#1ea2e4"></stop></linearGradient><path fill="url(#nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1)" d="M39,10l-2.835,31.181C36.072,42.211,35.208,43,34.174,43H13.826	c-1.034,0-1.898-0.789-1.992-1.819L9,10H39z"></path><path fill="#0176d0" d="M32,7c0-1.105-0.895-2-2-2H18c-1.105,0-2,0.895-2,2c0,0,0,0.634,0,1h16C32,7.634,32,7,32,7z"></path><path fill="#007ad9" d="M7,9.886L7,9.886C7,9.363,7.358,8.912,7.868,8.8C10.173,8.293,16.763,7,24,7s13.827,1.293,16.132,1.8	C40.642,8.912,41,9.363,41,9.886v0C41,10.501,40.501,11,39.886,11H8.114C7.499,11,7,10.501,7,9.886z"></path>
                  </svg>
                  {/* Apply selected font family to the selected text field */}
                  <input
                    id={data.id}
                    value={data.text}
                    onClick={(e) => handleRadioChange(index)}

                    onChange={(e) => handleTextFieldChange(e, index)}
                    placeholder="enter some text"
                    style={{
                      width: '87%',
                      height: "30px",
                      borderRadius: ".7vh",
                      padding: "2vh",
                      color: 'black',
                      margin: '2vh auto',
                      border:"2px solid black",
                      marginLeft: '1vh',
                      fontFamily: data.fontFamily
                      , fontSize: "15px",
                      outline: "none"
                    }}
                  />
                  <input
                  style={{margin:"0 1vh"}}
                    name="inputfield"
                    checked={data.isSelected}
                    type="radio"
                    onChange={(e) => handleRadioChange(index)}
                  />

                </div>)
            }

          })}
          </div>

</>

:""}
{
  menuData=="My Graphics"?<>
  <div style={{ display: "grid", alignItems: "center" }} >
  <input onChange={handlePic} hidden id="uploadimg" type="file" accept="image/*" />

  <label htmlFor="uploadimg"  className=" download-btn inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
  <img width="30" height="30" src="https://img.icons8.com/fluency/48/upload--v16.png" alt="upload--v16"/>
	     Upload
  </label>
</div>
  </>:""
}
{menuData=="Image"?<>
<div style={{ display: "grid", alignItems: "center" ,scrollbarWidth:"0"}} >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
            <input type="file"
              accept="image/*"
              onChange={(e) => handleAddImage(e, -1)}
              className="hidden"
              id="addImage" />
            <label htmlFor="addImage" style={{ backgroundColor: "khaki", display: "flex", alignItems: "center", margin: "1vh 2vh", width: "95%", height: "40px", }}><img style={{ margin: "0 2vh" }} src={addImageIcon.src} width={30} height={30} />Add Image</label>
          </div>
          {selectedImageData && <div style={{ zIndex: 1000, display: "block", width: "20vh", height: "20vh", background: "white", position: "absolute", top: selectedImageData.y-100, left: selectedImageData.x }}> <span onClick={() => {
            const updatedImageField = [...textFields];
            updatedImageField.splice(selectedImageData.index, 1)
            setTextFields(updatedImageField)
            setSelectedImageData(null)


          }} style={{ height: "5vh", borderBottom: "1px solid black", display: "flex", alignItems: "center", justifyContent: "space-around" }}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
              <linearGradient id="nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1" x1="18.405" x2="33.814" y1="10.91" y2="43.484" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#32bdef"></stop><stop offset="1" stopColor="#1ea2e4"></stop></linearGradient><path fill="url(#nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1)" d="M39,10l-2.835,31.181C36.072,42.211,35.208,43,34.174,43H13.826	c-1.034,0-1.898-0.789-1.992-1.819L9,10H39z"></path><path fill="#0176d0" d="M32,7c0-1.105-0.895-2-2-2H18c-1.105,0-2,0.895-2,2c0,0,0,0.634,0,1h16C32,7.634,32,7,32,7z"></path><path fill="#007ad9" d="M7,9.886L7,9.886C7,9.363,7.358,8.912,7.868,8.8C10.173,8.293,16.763,7,24,7s13.827,1.293,16.132,1.8	C40.642,8.912,41,9.363,41,9.886v0C41,10.501,40.501,11,39.886,11H8.114C7.499,11,7,10.501,7,9.886z"></path>
            </svg><span style={{ color: "black" }}>Delete</span></span>
            <input type="file"
              accept="image/*"
              onChange={(e) => handleAddImage(e, selectedImageData.index)}
              className="hidden"
              id="addImage1" />
            <label htmlFor='addImage1'
              style={{ height: "5vh", borderBottom: "1px solid black", display: "flex", alignItems: "center", justifyContent: "space-around", color: "black" ,boxShadow:"rgba(64, 87, 109, 0.07) 0px 0px 0px 1px, rgba(53, 71, 90, 0.2) 0px 2px 12px"}}><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/replace.png" alt="replace" />
              Replace</label></div>}
              <div style={
                {
                  width:"100%",
                  height:"70vh",
                  overflowY:"scroll"
                }
              }>
          {textFields && textFields.map((data, index) => {
            if (data.type == "image") {
              return (
                <>
                  <div key={index}
                    onClick={(e) =>{setImageBorder(index); setSelectedImageData(null)}} style={{ width: "100%", margin: "2vh 0", display: "flex", alignItems: "center", justifyContent: "" }}>

                    <label onContextMenu={(e) => { handleImageData(e, index) }} style={{ width: "fit-content", margin: "0 2vh" ,boxShadow:"rgba(64, 87, 109, 0.07) 0px 0px 0px 1px, rgba(53, 71, 90, 0.2) 0px 2px 12px"}} htmlFor={index}><img src={data.src} style={{ width: 50, height: 50 ,border:imageBorder==index?"2px solid black":"none"}} /></label>
                  </div>

                </>
              )
            }
          })}
          </div>
        </div>
</>:""}
{menuData=="Shape"?<>
<div  style={{ display: "grid", alignItems: "center" }} >
 {shapeData && shapeData.map((data)=>{
  return(
    <img onClick={()=>handleAddShape(data.img)} src={data.img} width={250} height={150}/>
  )
 })}
   </div>
</>:""}
{
  menuData=="Download"?
  <div  style={{ display: "grid", alignItems: "center" }} >
     <button  onClick={handlePrint2}
        type="button" 
        className=" download-btn px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"
    >
      <img width="30" height="30" src="https://img.icons8.com/ios/50/print--v1.png" alt="print--v1"/>
        <span class="ml-2">Print</span>
    </button>
    <button  onClick={handlePrint1}  type="button" className=" download-btn text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2 px-4 py-3">
    <img width="30" height="30" src="https://img.icons8.com/ios/50/pdf--v1.png" alt="pdf--v1"/>Download As PDF
    </button>
	<button  onClick={handleDownloadImage1}  type="button" className=" download-btn text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
  <img width="30" height="30" src="https://img.icons8.com/ios/50/jpg.png" alt="jpg"/> Download JPG</button>
<button onClick={handleDownloadImage2} type="button" className=" download-btn  text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
<img width="30" height="30" src="https://img.icons8.com/ios/50/png.png" alt="png"/>Download As PNG
</button>
    {/* <button className="download-btn" style={{color:"white"}}>Print</button> */}
    {/* <button onClick={handlePrint1} className="download-btn" style={{background:"green"}}>Download As PDF</button>
    <button onClick={handleDownloadImage1} style={{background:"blue"}} className="download-btn">Download As JPG</button>
    <button onClick={handleDownloadImage2} style={{background:"yellow",color:"red"}} className="download-btn">Download As PNG</button> */}
  </div>
  :""
}
</div>
     </div>
        </>
    )
}

export default NewSideBar;