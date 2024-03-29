import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
const ImageBanner = ({ addFields, textFields, setTextFields, certificateRef, selectedTextFieldIndex, selectedImage }) => {

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

    const handleTextFieldChange = (event, index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index].text = event.target.value;
        setTextFields(updatedTextFields);
    };

    let offsetLeft, offsetTop

    return (
        <div className="flex flex-col items-center relative" style={{ width: "100%" }}>


            {selectedImage && (

                <div
                    ref={certificateRef}
                    className="mt-4 w-full h-40 md:h-48 lg:h-64 bg-cover bg-center"
                    style={{
                        width: 900,
                        height: "100vh",
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: 'cover', // or '100%'
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
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
                                        , textTransform: textField.textOrientation
                                    }}
                                ></textarea>
                            </Draggable>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
};

export default ImageBanner;
