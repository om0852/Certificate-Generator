import React, { useEffect, useState } from 'react';

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
  handleImageChange

}) => {
  const [selectedFontFamily, setSelectedFontFamily] = useState('Times New Romans'); // State to hold the selected font family

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
  const fontSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
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

        <button className='rounded' style={{ margin: "2vh auto", width: "90%", height: "40px", background: "red" }} onClick={() => addFields()}>Add Field</button>
        <button className='rounded'
          style={{ width: "90%", height: "40px", background: "green" }}
          onClick={downloadCertificate}
        >
          download{' '}
        </button>
      </div>
      {textFields &&
        textFields.map((data, index) => {
          return (
            <div style={{ display: 'flex' }}>

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
      {/* Dropdown menu to select font family */}
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
  );
};

export default Sidebar;
