"use client"
import { useState,useEffect } from "react";
import addImageIcon from "../../images/addimage.png"

import "./component.css"
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
const [showMenu,setMenu]=useState(false);
const [menuData,setMenuData]=useState("");

const [selectedFontFamily, setSelectedFontFamily] = useState('Times New Romans'); // State to hold the selected font family
//this tracker is used to called  used effect when state of textField change based on some condition
const [asyncTracker, setAsyncTracker] = useState(0);

const [selectedImageData, setSelectedImageData] = useState(null);
const [tabGroup1, setTabGroup1] = useState(true);
const [tabGroup2, setTabGroup2] = useState(true);

const handleImageData = (e, i) => {
  setSelectedImageData({ x: e.clientX, y: e.clientY, index: i })

}


const fontFamilies = [
  'Arial',
  'Arial Black',
  'Arial Narrow',
  'Arial Rounded MT Bold',
  'Book Antiqua',
  'Bookman Old Style',
  'Bradley Hand',
  'Brush Script MT',
  'Calibri',
  'Cambria',
  'Candara',
  'Century',
  'Century Gothic',
  'Comic Sans MS',
  'Consolas',
  'Constantia',
  'Copperplate',
  'Courier',
  'Courier New',
  'Didot',
  'Dubai',
  'Ebrima',
  'Franklin Gothic Medium',
  'Gabriola',
  'Garamond',
  'Georgia',
  'Gill Sans',
  'Helvetica',
  'Impact',
  'Lucida Console',
  'Lucida Grande',
  'Lucida Sans',
  'Lucida Sans Unicode',
  'MS Gothic',
  'MS PGothic',
  'MS Reference Sans Serif',
  'MS Sans Serif',
  'MS Serif',
  'MV Boli',
  'Myriad',
  'Myriad Pro',
  'Nirmala UI',
  'Palatino',
  'Palatino Linotype',
  'Segoe Print',
  'Segoe Script',
  'Segoe UI',
  'Segoe UI Historic',
  'Segoe UI Symbol',
  'Tahoma',
  'Times',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
  'Yu Gothic',
  // Add more font families as needed
];
const textOrientation = ["capitalize", "uppercase", "lowercase", "none"];
let fontSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
useEffect(() => {
  if (asyncTracker != 0) {
    handleHistoryComponent();
    console.log(textFields)
  }
}, [asyncTracker])

// Function to handle font family change
const onChangeFontSize = (e) => {
  const updatedTextFields = textFields.map((textField, index) => {
    if (selectedTextFieldIndex != -1) {

      if (index === selectedTextFieldIndex) {
        return { ...textField, size: e.target.value };
      }
      return textField;
    }
  });
  setTextFields(updatedTextFields);
  setAsyncTracker(prev => prev + 1);

}
const onChangeFontFamily = (e) => {
  const updatedTextFields = textFields.map((textField, index) => {

    if (index === selectedTextFieldIndex && selectedTextFieldIndex != -1) {
      return { ...textField, fontFamily: e.target.value };
    }
    return textField;
  });
  setTextFields(updatedTextFields);
  setAsyncTracker(prev => prev + 1);
};
const onChangeOrientation = (e) => {
  const updatedTextFields = textFields.map((textField, index) => {

    if (index === selectedTextFieldIndex && selectedTextFieldIndex != -1) {
      return { ...textField, textOrientation: e.target.value };
    }
    return textField;
  });
  setTextFields(updatedTextFields);
  setAsyncTracker(prev => prev + 1);

}
const changeBold = () => {
  const updatedTextFields = [...textFields];
  if (textFields[selectedTextFieldIndex].bold == "bold") {
    updatedTextFields[selectedTextFieldIndex].bold = "normal";
    setTextFields(updatedTextFields);

  }
  else {
    updatedTextFields[selectedTextFieldIndex].bold = "bold";
    setTextFields(updatedTextFields);
  }
  setAsyncTracker(prev => prev + 1);

}
const changeItalic = () => {
  const updatedTextFields = [...textFields];
  if (textFields[selectedTextFieldIndex].italic == "italic") {
    updatedTextFields[selectedTextFieldIndex].italic = "normal";
    setTextFields(updatedTextFields);

  }
  else {
    updatedTextFields[selectedTextFieldIndex].italic = "italic";
    setTextFields(updatedTextFields);
  }
  setAsyncTracker(prev => prev + 1);
}
const changeUnderline = () => {
  const updatedTextFields = [...textFields];
  if (textFields[selectedTextFieldIndex].underline == "underline") {
    updatedTextFields[selectedTextFieldIndex].underline = "none";
    setTextFields(updatedTextFields);

  }
  else {
    updatedTextFields[selectedTextFieldIndex].underline = "underline";
    setTextFields(updatedTextFields);
  }
  setAsyncTracker(prev => prev + 1);

}


const handleConvertToPdf = async () => {
  const element = certificateRef.current;

  var options = {
    filename: 'test.pdf',
  };
  domToPdf(element, options, function (pdf) {
    console.log('done');
  }, 900, 400);
};

const handleTransparency = (e) => {
  const updatedImageFields = [...textFields];
  updatedImageFields[imageBorder].transparency = e.target.value
  setTextFields(updatedImageFields)


}
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
    return(
        <>    
     <div style={{width:'15vh',height:"100vh",background:"white",zIndex:1501}}>
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
</div>
        <div  onClick={(e)=>{setMenu(true);setMenuData("Image")}} className="sidebar-icon">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52 80 80H40Zm176 28h-21.37l-36-36 20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12 12 12 0 0 1-12-12Z"></path></svg>
        Image
        </div>
        
        <div  onClick={(e)=>{setMenu(true);setMenuData("Graphics")}} className="sidebar-icon">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M192 116a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm-40-52h-40a8 8 0 0 0 0 16h40a8 8 0 0 0 0-16Zm96 48v32a24 24 0 0 1-24 24h-2.36l-16.21 45.38A16 16 0 0 1 190.36 224h-12.72a16 16 0 0 1-15.07-10.62l-1.92-5.38h-57.3l-1.92 5.38A16 16 0 0 1 86.36 224H73.64a16 16 0 0 1-15.07-10.62L46 178.22a87.69 87.69 0 0 1-21.44-48.38A16 16 0 0 0 16 144a8 8 0 0 1-16 0 32 32 0 0 1 24.28-31A88.12 88.12 0 0 1 112 32h104a8 8 0 0 1 0 16h-21.39a87.93 87.93 0 0 1 30.17 37c.43 1 .85 2 1.25 3A24 24 0 0 1 248 112Zm-16 0a8 8 0 0 0-8-8h-3.66a8 8 0 0 1-7.64-5.6A71.9 71.9 0 0 0 144 48h-32a72 72 0 0 0-53.09 120.64 8 8 0 0 1 1.64 2.71L73.64 208h12.72l3.82-10.69a8 8 0 0 1 7.53-5.31h68.58a8 8 0 0 1 7.53 5.31l3.82 10.69h12.72l18.11-50.69A8 8 0 0 1 216 152h8a8 8 0 0 0 8-8Z"></path></svg>
        Graphics
        </div>
        <div  onClick={(e)=>{setMenu(true);setMenuData("Download")}} className="sidebar-icon">   
        <img width="32" height="32" src="https://img.icons8.com/material-outlined/32/download--v1.png" alt="download--v1"/>  
              Download
        </div>
        <div  onClick={(e)=>{setMenu(true);setMenuData("Upload")}} className="sidebar-icon">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="2em" height="2em"><path d="M240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h48a8 8 0 0 1 0 16H32v64h192v-64h-48a8 8 0 0 1 0-16h48a16 16 0 0 1 16 16ZM85.66 77.66 120 43.31V128a8 8 0 0 0 16 0V43.31l34.34 34.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32ZM200 168a12 12 0 1 0-12 12 12 12 0 0 0 12-12Z"></path></svg>
        Upload
        </div>
     </div>
     <div className="sidebar-menu" style={{left:showMenu==true?"15vh":"-30vh"}}>
<div style={{width:"100%",height:"5vh",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1vh 2vh"}}>{menuData}<img style={{cursor:"pointer"}} onClick={(e)=>{setMenu(false);setMenuData("")}} width="30" height="30" src="https://img.icons8.com/material-outlined/24/multiply--v1.png" alt="multiply--v1"/></div>
<div style={{width:"100%",height:"100%",marginTop:"2vh"}}>
{menuData=="Text" ?
<>
<button className='rounded' style={{ margin: "1vh auto", position: "relative", left: "5%", width: "90%", height: "40px", background: "khaki" }} onClick={() => addFields()}>Add Field</button>

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
</>
:""}
{menuData=="Image"?<>
<div style={{ display: "grid", alignItems: "center" }} >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
            <input type="file"
              accept="image/*"
              onChange={(e) => handleAddImage(e, -1)}
              className="hidden"
              id="addImage" />
            <label htmlFor="addImage" style={{ backgroundColor: "khaki", display: "flex", alignItems: "center", margin: "1vh 2vh", width: "95%", height: "40px", }}><img style={{ margin: "0 2vh" }} src={addImageIcon.src} width={30} height={30} />Add Image</label>
          </div>
          {selectedImageData && <div style={{ zIndex: 1000, display: "block", width: "20vh", height: "20vh", background: "white", position: "absolute", top: selectedImageData.y, left: selectedImageData.x }}> <span onClick={() => {
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
              style={{ height: "5vh", borderBottom: "1px solid black", display: "flex", alignItems: "center", justifyContent: "space-around", color: "black" }}><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/replace.png" alt="replace" />
              Replace</label></div>}
          {textFields && textFields.map((data, index) => {
            if (data.type == "image") {
              return (
                <>
                  <div key={index}
                    onClick={(e) => setSelectedImageData(null)} style={{ width: "100%", margin: "2vh 0", display: "flex", alignItems: "center", justifyContent: "" }}>

                    <label onContextMenu={(e) => { handleImageData(e, index) }} style={{ width: "fit-content", margin: "0 2vh" }} htmlFor={index}><img src={data.src} style={{ width: 50, height: 50 }} /></label>
                  </div>

                </>
              )
            }
          })}
        </div>
</>:""}

</div>
     </div>
        </>
    )
}

export default NewSideBar;