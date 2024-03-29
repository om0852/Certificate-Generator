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
const fontSizes=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
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
      <div className='style-option'>
        <div style={{display:"flex" ,alignItems:"center"}}><span style={{background:textFields[selectedTextFieldIndex].bold=="bold"?"grey":"none"}} className='bold'><img width="30" height="30" src="https://img.icons8.com/ios/30/bold.png" alt="bold"/></span>
      <span style={{background:textFields[selectedTextFieldIndex].italic=="italic"?"grey":"none"}}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/italic.png" alt="italic"/></span>
      <span style={{background:textFields[selectedTextFieldIndex].underline=="underline"?"grey":"none"}}><img width="30" height="30" src="https://img.icons8.com/ios/30/underline.png" alt="underline"/></span>
      </div>
      
      <div style={{marginTop:"2vh",display:"flex",alignItems:"center"}}>
      <input onClick={()=>{    const updatedTextFields = [...textFields];
    updatedTextFields[selectedTextFieldIndex].alignment = "justify";
    setTextFields(updatedTextFields);}} id='align-justify' type='radio' name="content-align" style={{visibility:"hidden",background:textFields[selectedTextFieldIndex].alignment=="justify"?"grey":"white"}}/>
      <label style={{background:textFields[selectedTextFieldIndex].alignment=="justify"?"grey":"none"}} htmlFor="align-justify"><img  width="30" height="30" src="https://img.icons8.com/ios/30/align-justify.png" alt="align-justify"/></label>
      <input  onClick={()=>{const updatedTextFields = [...textFields];
    updatedTextFields[selectedTextFieldIndex].alignment = "center"; setTextFields(updatedTextFields);}}  type='radio' name='content-align' id='align-center' style={{visibility:"hidden",background:textFields[selectedTextFieldIndex].alignment=="center"?"grey":"none"}}/>
      <label style={{background:textFields[selectedTextFieldIndex].alignment=="center"?"grey":"none"}}  htmlFor='align-center'><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/align-center.png" alt="align-center"/></label>
      <input  onClick={()=>{const updatedTextFields = [...textFields];
    updatedTextFields[selectedTextFieldIndex].alignment = "left"; setTextFields(updatedTextFields);}}  type='radio' name='content-align' id='align-left' style={{visibility:"hidden",background:textFields[selectedTextFieldIndex].alignment=="align-left"?"grey":"none"}}/><label style={{background:textFields[selectedTextFieldIndex].alignment=="left"?"grey":"none"}} htmlFor='align-left'><img width="30" height="30" src="https://img.icons8.com/ios/30/align-left.png" alt="align-left"/></label>
      <input  onClick={()=>{const updatedTextFields = [...textFields];
    updatedTextFields[selectedTextFieldIndex].alignment = "right"; setTextFields(updatedTextFields);console.log(textFields[selectedTextFieldIndex].alignment)}}  type='radio' name='content-align' id='align-right' style={{visibility:"hidden",background:textFields[selectedTextFieldIndex].alignment=="align-right"?"grey":"none"}}/>
      <label style={{background:textFields[selectedTextFieldIndex].alignment=="right"?"grey":"none"}} htmlFor='align-right'><img width="30" height="30" src="https://img.icons8.com/ios/30/align-right.png" alt="align-right"/>
      </label>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
