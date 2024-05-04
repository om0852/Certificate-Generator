"use client"
import FileSelector from "../component/FileSelector";
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from "../component/Sidebar";
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import selectImage from "../../images/selectimage.png"
import ReactToPrint from 'react-to-print';
import { toPng } from 'html-to-image';


export default function Page() {
    const [selectedTextFieldIndex, setSelectedTextFieldIndex] = useState(0); // State to hold the index of the selected text field
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [imageBorder, setImageBorder] = useState(null)

    const [textFields, setTextFields] = useState([
        { id: 1, x: 0, y: 0, text: 'Text 1', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true },
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
        const updatedTextFields = [...textFields];
        if (updatedTextFields[index].isSelected == false) {
            updatedTextFields[selectedTextFieldIndex].isSelected = false;
            updatedTextFields[index].isSelected = true; setTextFields(updatedTextFields)
            setSelectedTextFieldIndex(index);
        }
        console.log("data", updatedTextFields, selectedTextFieldIndex, index)
    };


    const downloadCertificate = async () => {
        // html2canvas(certificateRef.current).then(canvas => {
        //     const imgData = canvas.toDataURL('image/jpeg');
        //     const pdf = new jsPDF("l", "mm", 'a4');
        //     const pdfWidth = pdf.internal.pageSize.getWidth();
        //     const pdfHeight = pdf.internal.pageSize.getHeight();
        //     const imgWidth = canvas.width;
        //     const imgHeight = canvas.height;
        //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        //     let imgX = (pdfWidth - imgWidth * ratio) / 2
        //     let imgY = 30
        //     pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
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
        toPng(certificateRef.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'cetificate.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })


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
        const data = { id: (textFields.length + 1), x: 0, y: 0, text: "Text" + (textFields.length + 1), fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: false }
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
                width: "100%", height: "100vh", alignItems: "center", overflow: "hidden", scrollbarWidth: "none",
                scrollBehavior: "smooth"
            }}>
                {/* <!-- Sidebar (Optional) --> */}

                <Sidebar imageBorder={imageBorder} setImageBorder={setImageBorder} certificateRef={certificateRef} setImageFields={setImageFields} imageFields={imageFields} handleImageChange={handleImageChange} selectedTextFieldIndex={selectedTextFieldIndex} handleRadioChange={handleRadioChange} setTextFields={setTextFields} textFields={textFields} downloadCertificate={downloadCertificate} handleTextFieldChange={handleTextFieldChange} addFields={addFields} />

                <FileSelector imageBorder={imageBorder} setImageBorder={setImageBorder} setImageFields={setImageFields} imageFields={imageFields} selectedImage={selectedImage} selectedTextFieldIndex={selectedTextFieldIndex} addFields={addFields} certificateRef={certificateRef} setTextFields={setTextFields} textFields={textFields} handleRadioChange={handleRadioChange} />
            </div >

        </>
    );
}
