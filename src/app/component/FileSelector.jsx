import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import "./component.css"
import sendToBack from "../../images/send to back.png";
import sendBack from "../../images/send back.png"
import bringToForward from "../../images/bring to forward.png"
const ImageBanner = ({ addFields, textFields, setTextFields, certificateRef, selectedTextFieldIndex, selectedImage, imageFields, setImageFields, handleRadioChange, imageBorder, setImageBorder }) => {
    const [menuPosition, setMenuPosition] = useState(null)
    const [selectImageLayer, setSelectImageLayer] = useState(null)
    // addFields(addTextField);
    useEffect(() => {
        console.log(textFields);
    }, [textFields])
    const handleBringToForward = () => {
        const updatedImages = [...imageFields];
        const updatedtextfield = [...textFields];
        let values1 = [0];
        let values2 = [0];
        let ind = Math.abs(selectImageLayer) - 1
        if (selectImageLayer < 0) {
            if (updatedImages.length > 0) {
                values1 = updatedImages
                    .map(obj => obj.z_index);
            }
            console.log(updatedtextfield)
            values2 = updatedtextfield
                .filter((obj, index) => index !== ind) // Exclude object at index i
                .map(obj => obj.z_index);
        }
        else {
            if (updatedImages.length > 0) {

                values1 = updatedImages
                    .filter((obj, index) => index !== selectImageLayer) // Exclude object at index i
                    .map(obj => obj.z_index);
            }
            if (textFields.length > 0) {

                values2 = updatedtextfield
                    .map(obj => obj.z_index);
            }
        }
        let maxValue = Math.max(...values1);
        let maxValue2 = Math.max(...values2);
        if (maxValue < maxValue2) {
            maxValue = maxValue2;
        }
        if (selectImageLayer < 0) {
            //  
            if (maxValue < 1) {

                updatedtextfield[ind].z_index = 1;
                setTextFields(updatedtextfield)
            }
            updatedtextfield[ind].z_index = maxValue + 1;
            setTextFields(updatedtextfield)

        }
        else {
            if (maxValue < 1) {

                updatedImages[selectImageLayer].z_index = 1;
                setImageFields(updatedImages)
            }
            updatedImages[selectImageLayer].z_index = maxValue + 1;
            setImageFields(updatedImages)

        }

    }
    const handleSendToBack = () => {
        const updatedImages = [...imageFields];
        const updatedtextfield = [...textFields];
        let values1 = [0];
        let values2 = [0];
        let ind = Math.abs(selectImageLayer) - 1
        if (selectImageLayer < 0) {
            if (updatedImages.length > 0) {
                values1 = updatedImages
                    .map(obj => obj.z_index);
            }
            console.log(updatedtextfield)
            if (updatedtextfield.length > 1) {
                values2 = updatedtextfield
                    .filter((obj, index) => index !== ind) // Exclude object at index i
                    .map(obj => obj.z_index);
            }

        }
        else {
            if (updatedImages.length > 1) {

                values1 = updatedImages
                    .filter((obj, index) => index !== selectImageLayer) // Exclude object at index i
                    .map(obj => obj.z_index);
            }
            if (textFields.length > 0) {

                values2 = updatedtextfield
                    .map(obj => obj.z_index);
            }
        }
        let maxValue = Math.min(...values1);

        let maxValue2 = Math.min(...values2);

        if (maxValue < maxValue2 && maxValue2 != 0) {
            maxValue = maxValue2;
        }
        if (selectImageLayer < 0) {

            updatedtextfield[ind].z_index = maxValue;
            setTextFields(updatedtextfield)
        }
        else {


            updatedImages[selectImageLayer].z_index = maxValue - 1;
            setImageFields(updatedImages)
        }

    }
    const handleSendBack = () => {
        const updatedImages = [...imageFields];
        const updatedtextfield = [...textFields];
        console.log(textFields)
        let values1 = [0];
        let values2 = [0];
        let ind = Math.abs(selectImageLayer) - 1
        if (selectImageLayer < 0) {
            if (updatedImages.length > 0) {
                values1 = updatedImages
                    .map(obj => obj.z_index);
            }
            if (updatedtextfield.length > 1) {
                values2 = updatedtextfield
                    .filter((obj, index) => index !== ind) // Exclude object at index i
                    .map(obj => obj.z_index);
            }
            console.log(values2)
        }
        else {
            if (updatedImages.length > 0) {

                values1 = updatedImages
                    .filter((obj, index) => index !== selectImageLayer) // Exclude object at index i
                    .map(obj => obj.z_index);
            }
            if (textFields.length > 0) {

                values2 = updatedtextfield
                    .map(obj => obj.z_index);
            }
        }
        let maxValue = Math.max(...values1);
        let maxValue2 = Math.max(...values2);

        if (maxValue > maxValue2) {
            maxValue = maxValue2;
        }
        if (selectImageLayer < 0) {

            if (maxValue < (updatedtextfield[ind].z_index + 1)) {
                updatedtextfield[ind].z_index--;
                setTextFields(updatedtextfield)
            }
        }
        else {
            if (maxValue < (updatedImages[selectImageLayer].z_index + 1)) {
                updatedImages[selectImageLayer].z_index--;
                setImageFields(updatedImages)
            }
        }
    }
    const handleBringForward = () => {
        const updatedImages = [...imageFields];
        const updatedtextfield = [...textFields];
        let values1 = [0];
        let values2 = [0];
        let ind = Math.abs(selectImageLayer) - 1
        if (selectImageLayer < 0) {
            if (updatedImages.length > 0) {
                values1 = updatedImages
                    .map(obj => obj.z_index);
            }
            console.log(updatedtextfield)
            values2 = updatedtextfield
                .filter((obj, index) => index !== ind) // Exclude object at index i
                .map(obj => obj.z_index);
        }
        else {
            if (updatedImages.length > 0) {

                values1 = updatedImages
                    .filter((obj, index) => index !== selectImageLayer) // Exclude object at index i
                    .map(obj => obj.z_index);
            }
            if (textFields.length > 0) {

                values2 = updatedtextfield
                    .map(obj => obj.z_index);
            }
        }
        let maxValue = Math.max(...values1);
        let maxValue2 = Math.max(...values2);
        if (maxValue < maxValue2) {
            maxValue = maxValue2;
        }

        if (selectImageLayer < 0) {
            let ind = Math.abs(selectImageLayer) - 1;

            if (maxValue > (updatedtextfield[ind].z_index - 1)) {
                updatedtextfield[ind].z_index++;
                setTextFields(updatedtextfield)
            }
        }
        else {

            // Use Math.max() to get the maximum value
            if (maxValue > (updatedImages[selectImageLayer].z_index - 1)) {
                updatedImages[selectImageLayer].z_index++;
                setImageFields(updatedImages)
            }
        }
    }

    const stop = (e, data, index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index].x = e.clientX;
        updatedTextFields[index].y = e.clientY;
        setTextFields(updatedTextFields);
    }
    const stopImage = (e, data, index) => {
        const updatedTextFields = [...imageFields];
        // const rect = e.getBoundingClientRect();

        console.log(e)
        updatedTextFields[index].x = e.clientX;
        updatedTextFields[index].y = e.clientY;
        setImageFields(updatedTextFields);
    }
    const handleTextFieldChange = (event, index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index].text = event.target.value;
        setTextFields(updatedTextFields);
    };

    let offsetLeft, offsetTop

    return (
        <div className="flex flex-col items-center relative" style={{ width: "85%" }} onClick={(e) => { setMenuPosition(null); }}
        >

            {selectedImage ? "" : <div style={{ width: "693px", height: "462px", display: "grid", placeItems: "center", fontSize: 25 }}>Select Certificate Template</div>}
            {selectedImage && (

                <div ref={certificateRef}
                    className="mt-4 w-full h-40 md:h-48 lg:h-64 bg-cover bg-center"
                    style={{
                        width: 900,
                        height: "100%",
                        overflow: "hidden",
                        backgroundSize: 'cover', // or '100%'
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        display: "grid"
                        , placeItems: "center",
                        position: "relative", height: "720px"
                    }}
                >
                    <div>
                        <img src={selectedImage} style={{ width: 1000, height: "620px" }} />

                        {textFields.map((textField, index) => (
                            <div
                            >
                                <Draggable
                                    className="draggable"
                                    key={textField.id}
                                    defaultPosition={{ x: textField.x, y: textField.y }}
                                    onStop={(e, data) => { stop(e, data, index) }}
                                // onMouseDown={(e) => {
                                //     offsetLeft=e.clientX-offsetX
                                //     offsetTop=e.clientY-offsetY
                                //     document.addEventListener("mousemove",move)
                                // }
                                // }

                                >

                                    <textarea
                                        onContextMenu={(e) => { setSelectImageLayer(-(index + 1)); setMenuPosition(textField); }}
                                        id='resize-component'
                                        type="text"
                                        value={textField.text}
                                        onChange={(e) => handleTextFieldChange(e, index)}
                                        className="absolute border border-gray-400 bg-transparent text-black p-2"
                                        style={{
                                            left: textField.x, top: textField.y, border: "none", textAlign: textField.alignment, height: "8%", overflow: "hidden", fontFamily: textField.fontFamily, fontSize: parseInt(textField.size),
                                            fontWeight: textField.bold,
                                            textDecoration: textField.underline,
                                            fontStyle: textField.italic
                                            , textTransform: textField.textOrientation,
                                            color: "red",
                                            position: "absolute",
                                            top: 300,
                                            left: 100,
                                            zIndex: textField.z_index
                                        }}
                                    ></textarea>
                                </Draggable>
                            </div>
                        ))}
                        {menuPosition && <div style={{ cursor: "pointer", zIndex: 100, border: "1px solid black", width: "25vh", height: "40vh", background: "white", boxShadow: " 4px 6px 22px 0px rgba(0,0,0,0.75)", color: "black", position: "absolute", top: (menuPosition.y), left: (menuPosition.x - 300) }}>
                            <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", }}><img width="30" height="30" src={bringToForward.src} />Bring Forward</div>
                            <div onClick={handleBringForward} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around" }}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/bring-forward.png" alt="bring-forward" />Bring To Front</div>
                            <div onClick={handleSendBack} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around" }}><img width="30" height="30" src={sendBack.src} />sent Backward</div>
                            <div onClick={handleSendToBack} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around" }}><img width="30" height="30" src={sendToBack.src} />send to back</div>
                        </div>}
                        {imageFields && imageFields.map((data, index) => {
                            return (
                                <Draggable
                                    defaultPosition={{ x: 100, y: 100 }}
                                    onStop={(e, data1) => { stopImage(e, data1, index) }}
                                    className="draggableImage">
                                    <div onClick={(e) => { if (imageBorder == null) { setImageBorder(index) } else { setImageBorder(null) } }} id='resize-component' onContextMenu={(e) => { setSelectImageLayer(index); setMenuPosition(data); }} style={{ zIndex: data.z_index, width: data.width, height: data.height, overflow: "auto", position: "absolute", top: 100, left: 100, border: imageBorder != null ? "1px solid blue" : "none" }}>

                                        <img onClick={(e) => { setSelectImageLayer(index); setMenuPosition(null); }} style={{
                                            width: "100%", height: "100%",

                                        }} src={data.src} />
                                    </div>
                                </Draggable>
                            )
                        })}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ImageBanner;
