"use client"
import FileSelector from "../component/FileSelector";
import React, { useRef, useState } from 'react';
import Sidebar from "../component/Sidebar";
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
export default function Page() {
    const [selectedTextFieldIndex, setSelectedTextFieldIndex] = useState(0); // State to hold the index of the selected text field

    const certificateRef = useRef(null);

    const addFields = () => {
        addTextField();
    }
    const handleRadioChange = (index) => {
        setSelectedTextFieldIndex(index);
    };

    const downloadCertificate = () => {
        html2canvas(certificateRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg');
            const pdf = new jsPDF("l", "mm", [canvas.width, canvas.height]);
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            pdf.save("certificate.pdf");
        })
    }

    const [textFields, setTextFields] = useState([
        { id: 1, x: 300, y: 100, text: 'Text 1', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify" },
        { id: 2, x: 300, y: 80, text: 'Text 2', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", },


    ]);
    const addTextField = () => {
        const data = { id: (textFields.length + 1), x: 300, y: 150, text: "Text" + (textFields.length + 1), fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "none" }
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
                <Sidebar selectedTextFieldIndex={selectedTextFieldIndex} handleRadioChange={handleRadioChange} setTextFields={setTextFields} textFields={textFields} downloadCertificate={downloadCertificate} handleTextFieldChange={handleTextFieldChange} addFields={addFields} />
                <FileSelector selectedTextFieldIndex={selectedTextFieldIndex} addFields={addFields} certificateRef={certificateRef} setTextFields={setTextFields} textFields={textFields} />
            </div>

        </>
    );
}
