import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
const ImageBanner = ({ addFields, textFields, setTextFields, certificateRef, selectedTextFieldIndex, selectedImage, imageFields, setImageFields }) => {

    // addFields(addTextField);
    useEffect(() => {
        console.log(textFields);
    }, [textFields])


    const stop = (e, data, index) => {
        const updatedTextFields = [...textFields];
        const draggable = document.getElementsByClassName("draggable")
        updatedTextFields[index].x = data.x - draggable.offsetLeft;
        updatedTextFields[index].y = data.y - draggable.offsetTop;
        setTextFields(updatedTextFields);
    }
    const stopImage = (e, data, index) => {
        const updatedTextFields = [...imageFields];
        const draggable = document.getElementsByClassName("draggableImage")
        updatedTextFields[index].x = data.x - draggable.offsetLeft;
        updatedTextFields[index].y = data.y - draggable.offsetTop;
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
                        {imageFields && imageFields.map((data, index) => {
                            return (
                                <Draggable
                                    onResize={() => { alert("welcome") }}
                                    defaultPosition={{ x: data.x, y: data.y }}
                                    onStop={(e, data1) => { stopImage(e, data1, index) }}
                                    className="draggableImage">
                                    <div onResize={() => { alert("welcome") }} style={{ width: data.width, height: data.height, overflow: "auto", resize: "both", position: "absolute", top: data.y, left: data.x }}>

                                        <img onResize={() => { alert("welcome") }} style={{
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
