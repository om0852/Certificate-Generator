"use client"
import FileSelector from "../component/FileSelector";
import React, { useState } from 'react';
import Sidebar from "../component/Sidebar";
export default function Page() {
    const addFields = () => {
        alert("clicked")
        addTextField();
    }
    const [textFields, setTextFields] = useState([
        { id: 1, x: 300, y: 100, text: 'Text 1' },
        { id: 2, x: 300, y: 80, text: 'Text 2' },
        { id: 3, x: 300, y: 60, text: 'Text 3' },
        { id: 4, x: 300, y: 120, text: 'Text 4' },

    ]);
    const addTextField = () => {
        alert("run")
        const data = { id: (textFields.length + 1), x: 300, y: 150, text: "Text" + (textFields.length + 1) }
        setTextFields(prevTextFields => [
            ...prevTextFields,
            data
        ]);
    }
    const handleTextFieldChange = (event, index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index].text = event.target.value;
        setTextFields(updatedTextFields);
    };
    return (
        <>

            <div className="flex" style={{ width: "100%", height: "100vh", alignItems: "center" }}>
                {/* <!-- Sidebar (Optional) --> */}
                <Sidebar textFields={textFields} handleTextFieldChange={handleTextFieldChange} addFields={addFields} />
                <FileSelector addFields={addFields} setTextFields={setTextFields} textFields={textFields} />
            </div>

        </>
    );
}
