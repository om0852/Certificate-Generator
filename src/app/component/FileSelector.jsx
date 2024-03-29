import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
const ImageBanner = ({addFields,textFields,setTextFields,certificateRef,selectedTextFieldIndex}) => {
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const [selectedImage, setSelectedImage] = useState(null);
    // addFields(addTextField);
    useEffect(()=>{
console.log(textFields);
    },[textFields])
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
        
            reader.onload = () => {
                setSelectedImage(reader.result);
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height });
                };
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };
    

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
        <div className="flex flex-col items-center relative">
            
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageInput"
            />
            <label
                htmlFor="imageInput"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Select Image
            </label>
            {selectedImage && (

                <div
                ref={certificateRef}
                    className="mt-4 w-full h-40 md:h-48 lg:h-64 bg-cover bg-center"
                    style={{
                        width:600,
                        height:600,
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: 'contain', // or '100%'
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
                                    style={{ left: textField.x, top: textField.y ,border:"none",textAlign:textField.alignment,height:"8%",overflow:"hidden",fontFamily:textField.fontFamily,fontSize:parseInt(textField.size)}}
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
