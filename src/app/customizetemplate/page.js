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
    const [imageBorder, setImageBorder] = useState(0);
    const [selectImageLayer, setSelectImageLayer] = useState(0);

    const [textFields, setTextFields] = useState([
        { id: 1, x: 0, y: 0, text: 'Text 1', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false },
    ]);
    const [historyComponent, setHistoryComponent] = useState([[{ id: 1, x: 0, y: 0, text: 'Text 1', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false }]])
    const [historyIndex, setHistoryIndex] = useState([{ x: 0, y: 0 }]);
    const [imageFields, setImageFields] = useState([])
    const certificateRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');

    const [selectedImage, setSelectedImage] = useState(selectImage);

    useEffect(() => { console.log(historyComponent) }
        , [historyComponent])
    //main code


    const handleHistoryComponent = () => {
        console.log("add call");
        console.log(historyComponent)

        if (historyComponent.length > 16) {
            console.log("shift call")
            const updatedata = [...historyComponent];
            updatedata.shift()
            setHistoryComponent(updatedata);
            const updatedata1 = [...historyIndex];
            updatedata1.shift()
            setHistoryIndex(updatedata1);
        }
        let newX = selectedTextFieldIndex;
        let newY = selectImageLayer
        setHistoryIndex(prev => [
            ...prev, { x: newX, y: newY }
        ])
        const data = {
            id: textFields.length,
            x: textFields[selectImageLayer].x,
            y: textFields[selectImageLayer].y,
            text: textFields[selectImageLayer].text,
            fontFamily: textFields[selectImageLayer].fontFamily,
            size: textFields[selectImageLayer].size,
            bold: textFields[selectImageLayer].bold,
            italic: textFields[selectImageLayer].italic,
            alignment: textFields[selectImageLayer].alignment,
            underline: textFields[selectImageLayer].underline,
            textOrientation: textFields[selectImageLayer].textOrientation,
            color: textFields[selectImageLayer].color,
            z_index: textFields[selectImageLayer].z_index,
            type: textFields[selectImageLayer].type,
            transparency: textFields[selectImageLayer].transparency,
            width: textFields[selectImageLayer].width,
            height: textFields[selectImageLayer].height,
            isSelected: textFields[selectImageLayer].isSelected,
            isLocked: textFields[selectImageLayer].isLocked
        };
        const updatedata2 = [...historyComponent];

        updatedata2.push([data]);
        updatedata2[0] = [{ id: 1, x: 0, y: 0, text: 'Text 1', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false }];
        setHistoryComponent(updatedata2);

    }
    useEffect(() => {
        document.addEventListener("keyup", handleUndoComponent);
        return () => {
            document.removeEventListener("keyup", handleUndoComponent);
        }

    }, [historyComponent, historyIndex])

    const handleUndoComponent = (e) => {
        if (e.ctrlKey && e.key === 'z' && historyComponent.length > 1) {
            console.log("remove call")
            const updatedata = [...historyComponent] // Remove last item
            updatedata[0] = [{ id: 1, x: 0, y: 0, text: 'Text 1', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false }];
            let newArray = updatedata[historyComponent.length - 2]
            setTextFields(newArray);
            updatedata.pop()

            setHistoryComponent(updatedata);
            setSelectedTextFieldIndex(historyIndex[historyIndex.length - 2].x);
            setSelectImageLayer(historyIndex[historyIndex.length - 2].y);
            setImageBorder(historyIndex[historyIndex.length - 2].y)
            const updatedata1 = historyIndex.slice(0, -1); // Remove last item
            setHistoryIndex(updatedata1);
        }
    }
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
    };


    const downloadCertificate = async () => {

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
    }
    const addTextField = () => {
        const data = { id: (textFields.length + 1), x: 0, y: 0, text: "Text" + (textFields.length + 1), fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: false, isLocked: false }
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

                <Sidebar imageBorder={imageBorder} setImageBorder={setImageBorder} certificateRef={certificateRef} setImageFields={setImageFields} imageFields={imageFields} handleImageChange={handleImageChange} selectedTextFieldIndex={selectedTextFieldIndex} handleRadioChange={handleRadioChange} setTextFields={setTextFields} textFields={textFields} downloadCertificate={downloadCertificate} handleTextFieldChange={handleTextFieldChange} addFields={addFields} handleHistoryComponent={handleHistoryComponent} />
                <FileSelector imageBorder={imageBorder} setImageBorder={setImageBorder} setImageFields={setImageFields} imageFields={imageFields} selectedImage={selectedImage} selectedTextFieldIndex={selectedTextFieldIndex} addFields={addFields} certificateRef={certificateRef} setTextFields={setTextFields} textFields={textFields} handleRadioChange={handleRadioChange} setSelectImageLayer={setSelectImageLayer} handleHistoryComponent={handleHistoryComponent} selectImageLayer={selectImageLayer} historyComponent={historyComponent} />
            </div >

        </>
    );
}
