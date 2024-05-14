"use client"
import { useState,useEffect } from "react";
const StylingHeader = ({
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
    let fontSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 24];
    const [showLineSpacingMenu,setShowLineSpacingMenu]=useState(false)
    const [showPositionMenu,setPositionMenu]=useState(false)
    const [showTransparencyMenu,setShowTransparencyMenu]=useState(false)

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
    const onChangeTextColor = (e) => {
      const updatedTextFields = textFields.map((textField, index) => {
        if (selectedTextFieldIndex != -1) {
  
          if (index === selectedTextFieldIndex) {
            return { ...textField, textColor: e.target.value };
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
    useEffect(()=>{
      console.log(textFields)
    },[textFields])
    return(
        <div style={{width:"100%",height:"8vh",background:"white"}}>
<div style={{display:"flex",alignItems:"center",position:"relative",top:"1vh"}}>
<select
            style={{ color: 'black', width: "14vh",height:"5vh", marginLeft: "3vh",border:"1px solid grey",outline:"none"  }}
            onChange={onChangeFontFamily}
            value={textFields[selectedTextFieldIndex].fontFamily}
          >
            {fontFamilies &&
              fontFamilies.map((data, index) => {
                if (textFields[selectedTextFieldIndex].fontFamily == data) {
                  return (
                    <option key={index} value={data} style={{ fontFamily: data, color: 'black' }}>
                      {data}
                    </option>
                  );
                }
                else {
                  return (
                    <option key={index} value={data} style={{ fontFamily: data, color: 'black' }}>
                      {data}
                    </option>
                  );
                }

              })}
          </select>

          {/* size change  */}
          <input type="number" min={1} max={100}
            onChange={onChangeFontSize}
            style={{ color: 'black', margin: "1vh 0", width: "6vh",height:"5vh", marginLeft: "3vh",border:"1px solid grey",outline:"none"  }}
            value={textFields[selectedTextFieldIndex].size}
         />
         {/* color picker */}
         <input onChange={onChangeTextColor} style={{display:"none"}} type="color" id="colorpicker"/>
           <label htmlFor="colorpicker" style={{width:"7vh",height:"5vh",display:"grid",placeItems:"center"}}>
A           <div style={{width:"3.5vh",borderRadius:"1vh",height:"1vh",background:"red"}} ></div>
           </label>
            <span onClick={changeBold} style={{ background: textFields[selectedTextFieldIndex].bold == "bold" ? "#c1c9c4" : "none",margin:"0 .5vh" }} className='bold'><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/bold.png" alt="bold"/></span>
            <span onClick={changeItalic} style={{ background: textFields[selectedTextFieldIndex].italic == "italic" ? "#c1c9c4" : "none",margin:"0 .4vh" }}><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/italic.png" alt="italic" /></span>
            <span onClick={changeUnderline} style={{ background: textFields[selectedTextFieldIndex].underline == "underline" ? "#c1c9c4" : "none",margin:"0 .5vh" }}><img width="24" height="24" src="https://img.icons8.com/ios/24/underline.png" alt="underline" /></span>

            <select
            onChange={onChangeOrientation}
            value={textFields[selectedTextFieldIndex].textOrientation}
            style={{color: 'black', width: "7vh",height:"5vh", marginLeft: "2vh",border:"1px solid grey",outline:"none" }}>
            {textOrientation &&
              textOrientation.map((data, index) => {
                if (textFields[selectedTextFieldIndex].textOrientation == data) {
                  return (
                    <option key={index} value={data} style={{ color: 'black', textTransform: data }}>
                      {data}
                    </option>
                  );
                }
                else {
                  return (
                    <option key={index} value={data} style={{ color: 'black', textTransform: data }}>
                      {data}
                    </option>
                  );
                }

              })}
          </select>
          <div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
          {/* align ment  */}
          <input onClick={() => {
              const updatedTextFields = [...textFields];
              updatedTextFields[selectedTextFieldIndex].alignment = "justify";
              setTextFields(updatedTextFields);
            }} id='align-justify' type='radio' name="content-align" style={{ display: "none", background: textFields[selectedTextFieldIndex].alignment == "justify" ? "grey" : "white" }} />
            <label style={{ background: textFields[selectedTextFieldIndex].alignment == "justify" ? "#c1c9c4" : "none", margin:"0 1vh" }} htmlFor="align-justify"><img width="24" height="24" src="https://img.icons8.com/ios/24/align-justify.png" alt="align-justify" /></label>
            <input onClick={() => {
              const updatedTextFields = [...textFields];
              updatedTextFields[selectedTextFieldIndex].alignment = "center"; setTextFields(updatedTextFields);
            }} type='radio' name='content-align' id='align-center' style={{ display: "none", background: textFields[selectedTextFieldIndex].alignment == "center" ? "grey" : "none", border: "1px solid black" }} />
            <label style={{background: textFields[selectedTextFieldIndex].alignment == "center" ? "#c1c9c4" : "none", margin:"0 1vh"  }} htmlFor='align-center'><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/align-center.png" alt="align-center" /></label>
            <input onClick={() => {
              const updatedTextFields = [...textFields];
              updatedTextFields[selectedTextFieldIndex].alignment = "left"; setTextFields(updatedTextFields);
            }} type='radio' name='content-align' id='align-left' style={{ display: "none", background: textFields[selectedTextFieldIndex].alignment == "align-left" ? "grey" : "none", border: "1px solid black" }} />
            <label style={{ background: textFields[selectedTextFieldIndex].alignment == "align-left" ? "#c1c9c4" : "none", margin:"0 1vh"  }} htmlFor='align-left'><img width="24" height="24" src="https://img.icons8.com/ios/24/align-left.png" alt="align-left" /></label>
            <input onClick={() => {
              const updatedTextFields = [...textFields];
              updatedTextFields[selectedTextFieldIndex].alignment = "right"; setTextFields(updatedTextFields); console.log(textFields[selectedTextFieldIndex].alignment)
            }} type='radio' name='content-align' id='align-right' style={{ display: "none", background: textFields[selectedTextFieldIndex].alignment == "align-right" ? "grey" : "none", border: "1px solid black" }} />
            <label style={{ background: textFields[selectedTextFieldIndex].alignment == "align-right" ? "#c1c9c4" : "none", margin:"0 1vh" }} htmlFor='align-right'><img width="24" height="24" src="https://img.icons8.com/ios/24/align-right.png" alt="align-right" />
            </label>
            <div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
<div>
  <div style={{width:"40vh",height:"15vh",background:"white",position:"absolute",top:showLineSpacingMenu==false?"-30vh":"10vh",border:"1px solid black",zIndex:1500}}>
   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%", height: "7vh" }}><span style={{width:"70%",marginLeft:"4vh"}}>Letter Spacing:</span>
            <input
              onChange={(e) => { if (imageBorder !== null && e.target.value != "" && parseInt(e.target.value) >=0 && parseInt(e.target.value) < 300) { const updatedImageField = [...textFields]; updatedImageField[imageBorder].letterSpacing = parseInt(e.target.value); setTextFields(updatedImageField) } }}
               style={{ border: "1px solid black", padding: "auto", width: "7vh", outline: "none", color: "black",marginRight:"3vh"  }}
              type='number'
              value={imageBorder == null ? 0 : parseInt(textFields[imageBorder].letterSpacing)}
       />
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%", height: "7vh" }}><span style={{width:"70%",marginLeft:"4vh"}}>Line Spacing:</span>
            <input onChange={(e) => { if (imageBorder !== null && e.target.value != "" && parseInt(e.target.value) >= 10 && parseInt(e.target.value) < 300) { const updatedImageField = [...textFields]; updatedImageField[imageBorder].lineHeight = parseInt(e.target.value); setTextFields(updatedImageField) } }}
             style={{ border: "1px solid black", padding: "auto", width: "7vh", outline: "none", color: "black",marginRight:"3vh" }}
              type='number'

              value={imageBorder == null ? 0 : parseInt(textFields[imageBorder].lineHeight)} />
          </div></div><span onClick={(e)=>{if(showLineSpacingMenu==false){
            setShowLineSpacingMenu(true);
            setPositionMenu(false);
            setShowTransparencyMenu(false)

          }
          else{
            setShowLineSpacingMenu(false)
          }}}><svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 12c0 .4-.3.8-.7.8h-9.7c-.4 0-.7-.3-.7-.8 0-.4.3-.8.7-.8h9.7c.4 0 .7.4.7.8zM10.6 6.8h9.7c.4 0 .7-.4.7-.8s-.3-.8-.7-.8h-9.7c-.4 0-.7.3-.7.8 0 .4.4.8.7.8zM20.3 17.2h-9.7c-.4 0-.7.3-.7.8s.3.8.7.8h9.7c.4 0 .7-.3.7-.8s-.3-.8-.7-.8zM8.4 17.2c.3.2.3.6 0 .9l-3 2.5c-.3.2-.8.2-1.1 0l-3-2.5c-.3-.2-.3-.6 0-.9.3-.2.8-.2 1.1 0l1.7 1.4V5.3L2.4 6.8c-.3.2-.8.2-1.1 0-.3-.3-.3-.7 0-.9l3-2.5c.3-.2.8-.2 1.1 0l3 2.5c.3.2.3.6 0 .9-.3.2-.8.2-1.1 0L5.6 5.3v13.3l1.7-1.4c.3-.2.8-.2 1.1 0z"></path></svg></span></div>

          {/* shadow feature */}
          <div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
<div style={{display:"grid",placeItems:"center",width:"9vh",height:"100%"}}>Shadow</div>

{/* position feature  */}
<div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
<div style={{display:"grid",placeItems:"center",width:"9vh",height:"100%"}}><span onClick={(e)=>{if(showPositionMenu==false){  setShowTransparencyMenu(false)
;setPositionMenu(true);setShowLineSpacingMenu(false)}else{
  setPositionMenu(false)
}}}>Position</span> 
<div style={{width:"40vh",height:"15vh",background:"white",position:"absolute",top:showPositionMenu==false?"-30vh":"10vh",border:"1px solid black",zIndex:1500}}>

  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%", height: "7vh" }}><span style={{width:"70%",marginLeft:"4vh"}}>Left:</span>
            <input
              onChange={(e) => { if (imageBorder !== null && e.target.value != "" && parseInt(e.target.value) >=-400 && parseInt(e.target.value) < 1300) { const updatedImageField = [...textFields]; updatedImageField[imageBorder].x = parseInt(e.target.value); setTextFields(updatedImageField) } }}
               style={{ border: "1px solid black", padding: "auto", width: "7vh", outline: "none", color: "black",marginRight:"3vh"  }}
              type='number'
              value={imageBorder == null ? 0 : parseInt(textFields[imageBorder].x)}
       />
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%", height: "7vh" }}><span style={{width:"70%",marginLeft:"4vh"}}>Top:</span>
            <input onChange={(e) => { if (imageBorder !== null && e.target.value != "" && parseInt(e.target.value) >= -400 && parseInt(e.target.value) < 1300) { const updatedImageField = [...textFields]; updatedImageField[imageBorder].y = parseInt(e.target.value); setTextFields(updatedImageField) } }}
             style={{ border: "1px solid black", padding: "auto", width: "7vh", outline: "none", color: "black",marginRight:"3vh" }}
              type='number'

              value={imageBorder == null ? 0 : parseInt(textFields[imageBorder].y)} />
          </div></div></div>
          <div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
<div><span onClick={(e)=>{if(showTransparencyMenu==false){setShowTransparencyMenu(true);setPositionMenu(false);setShowLineSpacingMenu(false)}else{
  setShowTransparencyMenu(false)
}}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="1em" height="1em"><path d="M0 0h3v3H0zM0 6h3v3H0zM0 12h3v3H0z"></path><path opacity="0.75" d="M3 9h3v3H3zM3 3h3v3H3z"></path><path opacity="0.5" d="M6 0h3v3H6zM6 6h3v3H6zM6 12h3v3H6z"></path><path opacity="0.35" d="M9 3h3v3H9zM9 9h3v3H9z"></path><path opacity="0.15" d="M12 12h3v3h-3zM12 6h3v3h-3zM12 0h3v3h-3z"></path></svg></span>
          <div style={{width:"40vh",height:"15vh",background:"white",position:"absolute",display:showTransparencyMenu==true?"block":"none" ,top:"10vh",border:"1px solid black",zIndex:1500}}>
          <div style={{width: "100%", height: "7vh" }}>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "1vh auto" }} >Transparency    <input type='number'
            onChange={(e) => { if (e.target.value != "" && e.target.value >= 0 && e.target.value < 101) { const updatedImageField = [...textFields]; updatedImageField[imageBorder].transparency = e.target.value; setTextFields(updatedImageField) } }} style={{ border: "1px solid black", padding: "auto", width: "7vh", outline: "none", color: "black" }}
            value={imageBorder == null ? 0 : parseFloat(textFields[imageBorder].transparency) * 1} />
          </div>
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <input type="range" style={{ width: "80%", margin: "1vh 0", height: ".6vh" }} value={imageBorder == null ? 0 : parseFloat(textFields[imageBorder].transparency)}
              onChange={(e) => handleTransparency(e)}

            /></div>
            </div>
        </div>
</div>
{/* resizing the certificate size  */}

<div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
<div>Resize</div>

{/* copy feature  */}
<div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
<div>Copy Style</div>
<div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
<div>Paste Style </div>
<div style={{display:"grid",placeItems:"center",width:"5vh",height:"100%"}}>|</div>
<div>Lock</div>
    </div>  
          </div>
    )

}
export default StylingHeader;