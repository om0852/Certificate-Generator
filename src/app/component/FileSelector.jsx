import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import sendToBack from "../../images/send to back.png";
import sendBack from "../../images/send back.png"
import bringToForward from "../../images/bring to forward.png"
const ImageBanner = ({ addFields, textFields, setTextFields, certificateRef, selectedTextFieldIndex, selectedImage, imageFields, setImageFields }) => {
    const [menuPosition, setMenuPosition] = useState(null)
    const [selectImageLayer, setSelectImageLayer] = useState(null)
    // addFields(addTextField);
    useEffect(() => {
        console.log(textFields);
    }, [textFields])
    const handleBringToForward = () => {
        const updatedTextFields = [...imageFields];
        const values = updatedTextFields
            .filter((obj, index) => index !== selectImageLayer) // Exclude object at index i
            .map(obj => obj.z_index);
        const maxValue = Math.max(...values);
        if (maxValue < 1) {

            updatedTextFields[selectImageLayer].z_index = 1;
            setImageFields(updatedTextFields)
        }
        updatedTextFields[selectImageLayer].z_index = maxValue + 1;
        setImageFields(updatedTextFields)


    }
    const handleSendToBack = () => {
        const updatedTextFields = [...imageFields];
        const values = updatedTextFields
            .filter((obj, index) => index !== selectImageLayer) // Exclude object at index i
            .map(obj => obj.z_index);
        const maxValue = Math.min(...values);
        updatedTextFields[selectImageLayer].z_index = maxValue;
        setImageFields(updatedTextFields)

    }
    const handleSendBack = () => {
        const updatedTextFields = [...imageFields];
        const values = updatedTextFields
            .filter((obj, index) => index !== selectImageLayer) // Exclude object at index i
            .map(obj => obj.z_index);
        const maxValue = Math.min(...values);

        if (maxValue < (updatedTextFields[selectImageLayer].z_index + 1)) {
            updatedTextFields[selectImageLayer].z_index--;
            setImageFields(updatedTextFields)
        }
    }
    const handleBringForward = () => {
        const updatedTextFields = [...imageFields];
        const values = updatedTextFields
            .filter((obj, index) => index !== selectImageLayer) // Exclude object at index i
            .map(obj => obj.z_index);

        // Use Math.max() to get the maximum value
        const maxValue = Math.max(...values);
        if (maxValue > (updatedTextFields[selectImageLayer].z_index - 1)) {
            updatedTextFields[selectImageLayer].z_index++;
            setImageFields(updatedTextFields)
        }
    }

    const stop = (e, data, index) => {
        const updatedTextFields = [...textFields];
        const draggable = document.getElementsByClassName("draggable")
        updatedTextFields[index].x = data.x - draggable.offsetLeft;
        updatedTextFields[index].y = data.y - draggable.offsetTop;
        setTextFields(updatedTextFields);
    }
    const stopImage = (e, data, index) => {
        const updatedTextFields = [...imageFields];
        // const rect = e.getBoundingClientRect();

        console.log(e)
        updatedTextFields[index].x = data.x - e.offsetX;
        updatedTextFields[index].y = data.y - e.offsetY;
        setImageFields(updatedTextFields);
    }
    const handleTextFieldChange = (event, index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index].text = event.target.value;
        setTextFields(updatedTextFields);
    };

    let offsetLeft, offsetTop

    return (
        <div className="flex flex-col items-center relative" style={{ width: "85%" }}
        >

            {selectedImage ? "" : <div style={{ width: "693px", height: "462px", display: "grid", placeItems: "center", fontSize: 25 }}>Select Certificate Template</div>}
            {selectedImage && (

                <div ref={certificateRef}
                    className="mt-4 w-full h-40 md:h-48 lg:h-64 bg-cover bg-center"
                    style={{
                        width: 900,
                        height: "100vh",
                        backgroundSize: 'cover', // or '100%'
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        display: "grid"
                        , placeItems: "center",
                        position: "relative", width: "1280px", height: "720px"
                    }}
                >
                    <div>

                        <img src={selectedImage} style={{ width: 1000, height: "620px" }} />
                        {/* <h2 style={{ color: "red", position: "fixed", top: "28px" }}> omsalunke</h2> */}
                        {textFields.map((textField, index) => (
                            <div>
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

                                        }}
                                    ></textarea>
                                </Draggable>
                            </div>
                        ))}
                        {menuPosition && <div style={{ zIndex: 100, border: "1px solid black", width: "25vh", height: "40vh", background: "white", boxShadow: " 4px 6px 22px 0px rgba(0,0,0,0.75)", color: "black", position: "absolute", top: (menuPosition.y + 100), left: (menuPosition.x + 250) }}>
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
                                    <div onContextMenu={(e) => { setSelectImageLayer(index); setMenuPosition(data); }} style={{ zIndex: data.z_index, width: data.width, height: data.height, overflow: "auto", resize: "both", position: "absolute", top: 100, left: 100 }}>

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
