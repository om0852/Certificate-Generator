"use client"
import FileSelector from "../component/FileSelector";
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from "../component/Sidebar";
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import selectImage from "../../images/selectimage.png"
import ReactToPrint from 'react-to-print';


export default function Page() {
    const [selectedTextFieldIndex, setSelectedTextFieldIndex] = useState(0); // State to hold the index of the selected text field
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const [textFields, setTextFields] = useState([
        { id: 1, x: 300, y: 100, text: 'Text 1', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100 },
    ]);
    const [imageFields, setImageFields] = useState([])
    const certificateRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');

    const [selectedImage, setSelectedImage] = useState(selectImage);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            console.log(reader)
            reader.onload = () => {
                setSelectedImage(reader.result);
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height, x: 0, y: 0 });
                };
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        setSelectedImage(id != selectImage ? id : selectImage)
    }, [])
    const addFields = () => {
        addTextField();
    }
    const handleRadioChange = (index) => {
        setSelectedTextFieldIndex(index);
    };

    const downloadCertificate = async () => {
        // html2canvas(certificateRef.current).then(canvas => {
        //     const imgData = canvas.toDataURL('image/jpeg');
        //     const pdf = new jsPDF("l", "mm", [693, 600]);
        //     const imgWidth = pdf.internal.pageSize.getWidth();
        //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
        //     pdf.addImage(imgData, 'JPEG', 0, 0, 693, 462);
        //     const pdfBlob = pdf.output('blob');

        //     // Create Blob URL
        //     const pdfBlobUrl = URL.createObjectURL(pdfBlob);

        //     // Open the PDF in a new tab
        //     window.open(pdfBlobUrl, '_blank');
        //     // Create download link
        //     // const downloadLink = document.createElement('a');
        //     // downloadLink.href = URL.createObjectURL(pdfBlob);
        //     // downloadLink.download = 'certificate.pdf';

        //     // // Trigger the download
        //     // downloadLink.click();
        //     // // pdf.save("certificate.pdf");
        // })


        // convertHtmlToImage(certificateRef.current.innerHTML)
        // const imageBase64 = await convertHtmlToImage(certificateRef.current.innerHTML);
        // setImageSrc(`data:image/png;base64,${imageBase64}`);
        // html2canvas(certificateRef.current).then(canvas => {
        //     // Convert the canvas to a data URL representing a PNG image
        //     const imageData = canvas.toDataURL('image/png');

        //     // Create an anchor element to trigger the download
        //     const downloadLink = document.createElement('a');
        //     downloadLink.href = imageData;
        //     downloadLink.download = 'certificate.png';

        //     // Trigger the download
        //     downloadLink.click();
        // });
        // handleGeneratePdf()
    }


    // doc.html(certificateRef.current, {
    //     async callback(doc) {
    //         await doc.save('document');
    //     },
    // });
    // };
    const addTextField = () => {
        const data = { id: (textFields.length + 1), x: 300, y: 150, text: "Text" + (textFields.length + 1), fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", z_index: 100 }
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

            <div onContextMenu={(e) => { e.preventDefault(); }} className="flex" style={{
                width: "100%", height: "100vh", scrollbarWidth: "none",
                scrollBehavior: "smooth"
            }}>
                {/* <!-- Sidebar (Optional) --> */}

                <Sidebar certificateRef={certificateRef} setImageFields={setImageFields} imageFields={imageFields} handleImageChange={handleImageChange} selectedTextFieldIndex={selectedTextFieldIndex} handleRadioChange={handleRadioChange} setTextFields={setTextFields} textFields={textFields} downloadCertificate={downloadCertificate} handleTextFieldChange={handleTextFieldChange} addFields={addFields} />

                <FileSelector setImageFields={setImageFields} imageFields={imageFields} selectedImage={selectedImage} selectedTextFieldIndex={selectedTextFieldIndex} addFields={addFields} certificateRef={certificateRef} setTextFields={setTextFields} textFields={textFields} handleRadioChange={handleRadioChange} />
            </div >

        </>
    );
}
