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
    return(
        <div style={{width:"100%",height:"7vh",background:"white"}}>
<div style={{display:"flex",alignItems:"center",margin:"1vh 0"}}>
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
            <span onClick={changeItalic} style={{ background: textFields[selectedTextFieldIndex].italic == "italic" ? "#c1c9c4" : "none",margin:"0 .4vh" }}><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/italic.png" alt="italic" /></span>
            <span onClick={changeUnderline} style={{ background: textFields[selectedTextFieldIndex].underline == "underline" ? "#c1c9c4" : "none",margin:"0 .5vh" }}><img width="24" height="24" src="https://img.icons8.com/ios/30/underline.png" alt="underline" /></span>

            <select
            onChange={onChangeOrientation}
            value={textFields[selectedTextFieldIndex].textOrientation}
            style={{ color: 'black', width: "7vh", margin: "0vh 0" }}>
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
    </div>  
          </div>
    )

}
export default StylingHeader;