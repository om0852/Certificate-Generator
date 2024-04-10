import React, { useEffect, useState } from 'react';
import addImageIcon from "../../images/addimage.png"
import ReactToPrint from 'react-to-print';

const Input = ({ placeholder, name, type, handleChange, value, setTextFields }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001 "
    value={value}
    onChange={(e) => handleChange(name, e)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);


const Sidebar = ({
  addFields,
  handleTextFieldChange,
  textFields,
  downloadCertificate,
  setTextFields,
  handleRadioChange,
  selectedTextFieldIndex,
  handleImageChange,
  imageFields,
  setImageFields,
  certificateRef

}) => {
  const [selectedFontFamily, setSelectedFontFamily] = useState('Times New Romans'); // State to hold the selected font family
  const [styleDropdown, setStyleDropdown] = useState(false)
  const [addedComponent, setAddedComponent] = useState(false)
  const [addedImageComponent, setAddedImageComponent] = useState(false)
  const handleStyleDropdown = () => {
    setStyleDropdown(!styleDropdown);
  }
  const handleAddedComponent = () => {
    setAddedComponent(!addedComponent);
  }
  const handleImageAddedComponent = () => {
    setAddedImageComponent(!addedImageComponent);
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
    console.log(textFields)

  }
  const onChangeFontFamily = (e) => {
    const updatedTextFields = textFields.map((textField, index) => {

      if (index === selectedTextFieldIndex && selectedTextFieldIndex != -1) {
        return { ...textField, fontFamily: e.target.value };
      }
      return textField;
    });
    setTextFields(updatedTextFields);
    console.log(textFields)

  };
  const onChangeOrientation = (e) => {
    const updatedTextFields = textFields.map((textField, index) => {

      if (index === selectedTextFieldIndex && selectedTextFieldIndex != -1) {
        return { ...textField, textOrientation: e.target.value };
      }
      return textField;
    });
    setTextFields(updatedTextFields);
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
    console.log(textFields)
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
  }

  const handleDeleteField = () => {
    const updatedTextFields = [...textFields];
    if (updatedTextFields.length > 1) {
      updatedTextFields.splice(selectedTextFieldIndex, 1);
      setTextFields(updatedTextFields);
    }
    else {
      alert("1 field is mandatory")
    }
  }
  const handleAddImage = (event) => {
    const updatedImageField = [...imageFields];
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageSrc = reader.result;

        // Push new image object to updatedImageField
        updatedImageField.push({ src: imageSrc, x: 100, y: 100, width: 100, height: 100 });

        // Update state with updatedImageField
        setImageFields(updatedImageField);
      };

      // Start reading the file as a data URL
      reader.readAsDataURL(file);
    } else {
      // Handle invalid file type
      setSelectedImage(null);
    }
  };
  // Function to handle radio button change

  return (
    <div className="bg-blue-700" style={{ width: '40vh', height: '100vh', background: "rgb(86 17 151)" }}>

      <div style={{ width: "100%", margin: "1vh 0", display: "grid", placeItems: "center" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageInput"
        />
        <label
          htmlFor="imageInput"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Select Certificate
        </label>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
          <input type="file"
            accept="image/*"
            onChange={handleAddImage}
            className="hidden"
            id="addImage" />
          <label htmlFor="addImage" style={{ backgroundColor: "red", display: "flex", alignItems: "center", margin: "0vh 2vh", marginTop: "2vh", width: "95%", height: "40px", }}><img style={{ margin: "0 2vh" }} src={addImageIcon.src} width={30} height={30} />Add Image</label>
        </div>
        <button className='rounded' style={{ margin: "1vh auto", width: "90%", height: "40px", background: "red" }} onClick={() => addFields()}>Add Field</button>

        <ReactToPrint
          trigger={() => <button className='rounded'
            style={{ width: "90%", height: "40px", background: "green" }}  >Download</button>}
          content={() => certificateRef.current}
        />

      </div>
      <div onClick={handleAddedComponent} style={{ color: "black", width: "90%", margin: "1vh auto", background: "white", display: "flex", alignItems: "center", justifyContent: "space-around" }}><img style={{ rotate: addedComponent ? "270deg" : "0deg" }} width="20" height="20" src="https://img.icons8.com/ios/50/expand-arrow--v1.png" alt="expand-arrow--v1" /><div>TextFields</div>
      </div>
      <div style={{ display: addedComponent ? "none" : "block" }}>
        {textFields &&
          textFields.map((data, index) => {
            return (
              <div style={{ display: 'flex', alignItems: "center" }}>
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
                  <linearGradient id="nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1" x1="18.405" x2="33.814" y1="10.91" y2="43.484" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#32bdef"></stop><stop offset="1" stop-color="#1ea2e4"></stop></linearGradient><path fill="url(#nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1)" d="M39,10l-2.835,31.181C36.072,42.211,35.208,43,34.174,43H13.826	c-1.034,0-1.898-0.789-1.992-1.819L9,10H39z"></path><path fill="#0176d0" d="M32,7c0-1.105-0.895-2-2-2H18c-1.105,0-2,0.895-2,2c0,0,0,0.634,0,1h16C32,7.634,32,7,32,7z"></path><path fill="#007ad9" d="M7,9.886L7,9.886C7,9.363,7.358,8.912,7.868,8.8C10.173,8.293,16.763,7,24,7s13.827,1.293,16.132,1.8	C40.642,8.912,41,9.363,41,9.886v0C41,10.501,40.501,11,39.886,11H8.114C7.499,11,7,10.501,7,9.886z"></path>
                </svg>
                {/* Apply selected font family to the selected text field */}
                <input
                  id={data.id}
                  value={data.text}
                  onChange={(e) => handleTextFieldChange(e, index)}
                  placeholder="enter some text"
                  style={{
                    width: '90%',
                    height: "30px",
                    borderRadius: ".3vh",
                    padding: "2vh",
                    color: 'black',
                    margin: '2vh auto',
                    marginLeft: '1vh',
                    fontFamily: data.fontFamily
                    , fontSize: "15px",
                    outline: "none"
                  }}
                />
                {selectedTextFieldIndex == index ? <input
                  name="inputfield"
                  checked
                  type="radio"
                  onChange={() => handleRadioChange(index)}
                /> : <input
                  name="inputfield"
                  type="radio"
                  onChange={() => handleRadioChange(index)}
                />}

              </div>
            );
          })}
      </div>
      {imageFields && <div onClick={handleImageAddedComponent} style={{ color: "black", width: "90%", margin: "1vh auto", background: "white", display: "flex", alignItems: "center", justifyContent: "space-around" }}><img style={{ rotate: addedImageComponent ? "270deg" : "0deg" }} width="20" height="20" src="https://img.icons8.com/ios/50/expand-arrow--v1.png" alt="expand-arrow--v1" /><div>Images</div>
      </div>}
      <div style={{ display: addedImageComponent ? "none" : "block" }}>

        {imageFields && imageFields.map((data, index) => {
          return (
            <>
              <div style={{ width: "100%", margin: "2vh 0", display: "flex", alignItems: "center", justifyContent: "" }}>

                <label style={{ width: "fit-content", margin: "0 2vh" }} htmlFor={index}><img src={data.src} style={{ width: 50, height: 50 }} /></label>
                <svg onClick={() => {
                  const updatedImageField = [...imageFields];
                  updatedImageField.splice(index, 1)
                  setImageFields(updatedImageField)

                }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <linearGradient id="nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1" x1="18.405" x2="33.814" y1="10.91" y2="43.484" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#32bdef"></stop><stop offset="1" stop-color="#1ea2e4"></stop></linearGradient><path fill="url(#nyvBozV7VK1PdF3LtMmOna_pre7LivdxKxJ_gr1)" d="M39,10l-2.835,31.181C36.072,42.211,35.208,43,34.174,43H13.826	c-1.034,0-1.898-0.789-1.992-1.819L9,10H39z"></path><path fill="#0176d0" d="M32,7c0-1.105-0.895-2-2-2H18c-1.105,0-2,0.895-2,2c0,0,0,0.634,0,1h16C32,7.634,32,7,32,7z"></path><path fill="#007ad9" d="M7,9.886L7,9.886C7,9.363,7.358,8.912,7.868,8.8C10.173,8.293,16.763,7,24,7s13.827,1.293,16.132,1.8	C40.642,8.912,41,9.363,41,9.886v0C41,10.501,40.501,11,39.886,11H8.114C7.499,11,7,10.501,7,9.886z"></path>
                </svg>
              </div>

            </>
          )
        })}
      </div>
      {/* Dropdown menu to select font family */}
      <div onClick={handleStyleDropdown} style={{ color: "black", width: "90%", margin: "0 auto", background: "white", display: "flex", alignItems: "center", justifyContent: "space-around" }}><img style={{ rotate: styleDropdown ? "270deg" : "0deg" }} width="20" height="20" src="https://img.icons8.com/ios/50/expand-arrow--v1.png" alt="expand-arrow--v1" /><div>style</div>
      </div>
      <div style={{ display: styleDropdown ? "none" : "block" }}>

        <div style={{ display: "grid", placeItems: "center" }}>

          <select
            style={{ color: 'black', width: "90%", marginTop: "3vh" }}
            onChange={onChangeFontFamily}
          >
            {fontFamilies &&
              fontFamilies.map((data) => {
                if (textFields[selectedTextFieldIndex].fontFamily == data) {
                  return (
                    <option selected value={data} style={{ fontFamily: data, color: 'black' }}>
                      {data}
                    </option>
                  );
                }
                else {
                  return (
                    <option value={data} style={{ fontFamily: data, color: 'black' }}>
                      {data}
                    </option>
                  );
                }

              })}
          </select>
          <select
            onChange={onChangeOrientation}

            style={{ color: 'black', width: "90%", margin: "2vh 0" }}>
            {textOrientation &&
              textOrientation.map((data) => {
                if (textFields[selectedTextFieldIndex].textOrientation == data) {
                  return (
                    <option selected value={data} style={{ color: 'black', textTransform: data }}>
                      {data}
                    </option>
                  );
                }
                else {
                  return (
                    <option value={data} style={{ color: 'black', textTransform: data }}>
                      {data}
                    </option>
                  );
                }

              })}
          </select>
          <select
            onChange={onChangeFontSize}
            style={{ color: 'black', margin: "1vh 0" }}

          >
            {fontSizes && fontSizes.map((data) => {
              if (textFields[selectedTextFieldIndex].size == data) {
                return (
                  <option selected style={{ color: "black" }} value={data}>{data}</option>
                )
              }
              else {
                return (
                  <option style={{ color: "black" }} value={data}>{data}</option>
                )
              }

            })}
          </select>
        </div>

        <div style={{ margin: "3vh auto", padding: "2vh 0", border: "1px solid black", width: "90%" }} className='style-option'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            <span onClick={changeBold} style={{ background: textFields[selectedTextFieldIndex].bold == "bold" ? "grey" : "none", border: "1px solid black", border: "1px solid black" }} className='bold'><img width="30" height="30" src="https://img.icons8.com/ios/30/bold.png" alt="bold" /></span>
            <span onClick={changeItalic} style={{ background: textFields[selectedTextFieldIndex].italic == "italic" ? "grey" : "none", border: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/italic.png" alt="italic" /></span>
            <span onClick={changeUnderline} style={{ background: textFields[selectedTextFieldIndex].underline == "underline" ? "grey" : "none", border: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios/30/underline.png" alt="underline" /></span>
          </div>

          <div style={{ marginTop: "2vh", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            <input onClick={() => {
              const updatedTextFields = [...textFields];
              updatedTextFields[selectedTextFieldIndex].alignment = "justify";
              setTextFields(updatedTextFields);
            }} id='align-justify' type='radio' name="content-align" style={{ display: "none", background: textFields[selectedTextFieldIndex].alignment == "justify" ? "grey" : "white" }} />
            <label style={{ background: textFields[selectedTextFieldIndex].alignment == "justify" ? "grey" : "none", border: "1px solid black" }} htmlFor="align-justify"><img width="30" height="30" src="https://img.icons8.com/ios/30/align-justify.png" alt="align-justify" /></label>
            <input onClick={() => {
              const updatedTextFields = [...textFields];
              updatedTextFields[selectedTextFieldIndex].alignment = "center"; setTextFields(updatedTextFields);
            }} type='radio' name='content-align' id='align-center' style={{ display: "none", background: textFields[selectedTextFieldIndex].alignment == "center" ? "grey" : "none", border: "1px solid black" }} />
            <label style={{ background: textFields[selectedTextFieldIndex].alignment == "center" ? "grey" : "none", border: "1px solid black" }} htmlFor='align-center'><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/align-center.png" alt="align-center" /></label>
            <input onClick={() => {
              const updatedTextFields = [...textFields];
              updatedTextFields[selectedTextFieldIndex].alignment = "left"; setTextFields(updatedTextFields);
            }} type='radio' name='content-align' id='align-left' style={{ display: "none", background: textFields[selectedTextFieldIndex].alignment == "align-left" ? "grey" : "none", border: "1px solid black" }} /><label style={{ background: textFields[selectedTextFieldIndex].alignment == "left" ? "grey" : "none", border: "1px solid black" }} htmlFor='align-left'><img width="30" height="30" src="https://img.icons8.com/ios/30/align-left.png" alt="align-left" /></label>
            <input onClick={() => {
              const updatedTextFields = [...textFields];
              updatedTextFields[selectedTextFieldIndex].alignment = "right"; setTextFields(updatedTextFields); console.log(textFields[selectedTextFieldIndex].alignment)
            }} type='radio' name='content-align' id='align-right' style={{ display: "none", background: textFields[selectedTextFieldIndex].alignment == "align-right" ? "grey" : "none", border: "1px solid black" }} />
            <label style={{ background: textFields[selectedTextFieldIndex].alignment == "right" ? "grey" : "none", border: "1px solid black" }} htmlFor='align-right'><img width="30" height="30" src="https://img.icons8.com/ios/30/align-right.png" alt="align-right" />
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
