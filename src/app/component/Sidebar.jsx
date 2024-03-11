import React, { useEffect, useState } from 'react';

const Input = ({ placeholder, name, type, handleChange, value,setTextFields }) => (
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
  selectedTextFieldIndex

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
const fontSizes=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  // Function to handle font family change
  const onChangeFontSize=(e)=>{
    const updatedTextFields = textFields.map((textField, index) => {
        if(selectedTextFieldIndex!=-1){

            if (index === selectedTextFieldIndex) {
                return {...textField, size: e.target.value};
            }
            return textField;
        }
    });
    setTextFields(updatedTextFields);
    console.log(textFields)

  }
  const onChangeFontFamily = (e) => {
//     setSelectedFontFamily(e.target.value);
// setTextFields(...textFields[selectedTextFieldIndex],fontFamily:e.target.value)
    const updatedTextFields = textFields.map((textField, index) => {
        
        if (index === selectedTextFieldIndex && selectedTextFieldIndex!=-1) {
            return {...textField, fontFamily: e.target.value};
        }
        return textField;
    });
    setTextFields(updatedTextFields);
    console.log(textFields)

};

  // Function to handle radio button change

  return (
    <div className="bg-blue-700" style={{ width: '30vh', height: '100vh' }}>
      <button onClick={() => addFields()}>submit</button>
      <button
        style={{ position: 'absolute', top: '0' }}
        onClick={downloadCertificate}
      >
        download{' '}
      </button>
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
                  color: 'black',
                  margin: '2vh auto',
                  marginLeft: '1vh',
                  fontFamily:data.fontFamily
                    , fontSize: data.size,
                }}
              />
              <input
                name="inputfield"
                type="radio"
                onChange={() => handleRadioChange(index)}
              />
            </div>
          );
        })}
      {/* Dropdown menu to select font family */}
      <select
        style={{ color: 'black' }}
        onChange={onChangeFontFamily}
        value={selectedFontFamily}
      >
        {fontFamilies &&
          fontFamilies.map((data) => {
            return (
              <option value={data} style={{ fontFamily: data, color: 'black' }}>
                {data}
              </option>
            );
          })}
      </select>
      <select
      onChange={onChangeFontSize}
      style={{ color: 'black' }}

      >
{fontSizes && fontSizes.map((data)=>{
 return(
     <option style={{color:"black"}} value={data}>{data}</option>
 )
})}
      </select>
    </div>
  );
};

export default Sidebar;
