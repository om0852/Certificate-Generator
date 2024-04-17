"use client"
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import "./component.css"
import sendToBack from "../../images/send to back.png";
import sendBack from "../../images/send back.png"
import bringToForward from "../../images/bring to forward.png"
const ImageBanner = ({ addFields, setTextFields, certificateRef, selectedTextFieldIndex, selectedImage, textFields, handleRadioChange, imageBorder, setImageBorder }) => {
    const componentRef = useRef([])
    const ref = useRef([]);
    const refLeft = useRef([]);
    const refTop = useRef([]);
    const refRight = useRef([]);
    const refBottom = useRef([]);
    useEffect(() => {
        // if (imageBorder != null) {
        console.log(ref.current)
        console.log(refLeft.current[0])
        let resizerRight;
        let resizerTop;
        let resizerBottom;
        let resizerLeft;
        if (true) {

            ref.current.forEach((divRef, index) => {
                const resizeableEle = divRef;
                if (!resizeableEle) return; // Check if resizeableEle is valid
                const styles = window.getComputedStyle(resizeableEle);

                let width = parseInt(styles.width, 10);
                let height = parseInt(styles.height, 10);
                let x = 0;
                let y = 0;

                // resizeableEle.style.top = "50px";
                // resizeableEle.style.left = "50px";

                // Right resize
                const onMouseMoveRightResize = (event) => {
                    const dx = event.clientX - x;
                    x = event.clientX;
                    width = width + dx;
                    resizeableEle.style.width = `${width}px`;
                };

                const onMouseUpRightResize = (event) => {
                    document.removeEventListener("mousemove", onMouseMoveRightResize);
                };

                const onMouseDownRightResize = (event) => {
                    x = event.clientX;
                    // resizeableEle.style.left = styles.left;
                    // resizeableEle.style.right = null;
                    document.addEventListener("mousemove", onMouseMoveRightResize);
                    document.addEventListener("mouseup", onMouseUpRightResize);
                };

                // Top resize
                const onMouseMoveTopResize = (event) => {
                    const dy = event.clientY - y;
                    height = height - dy;
                    y = event.clientY;
                    resizeableEle.style.height = `${height}px`;
                };

                const onMouseUpTopResize = (event) => {
                    document.removeEventListener("mousemove", onMouseMoveTopResize);
                };

                const onMouseDownTopResize = (event) => {
                    y = event.clientY;
                    const styles = window.getComputedStyle(resizeableEle);
                    // resizeableEle.style.bottom = styles.bottom;
                    // resizeableEle.style.top = null;
                    document.addEventListener("mousemove", onMouseMoveTopResize);
                    document.addEventListener("mouseup", onMouseUpTopResize);
                };

                // Bottom resize
                const onMouseMoveBottomResize = (event) => {
                    const dy = event.clientY - y;
                    height = height + dy;
                    y = event.clientY;
                    resizeableEle.style.height = `${height}px`;
                };

                const onMouseUpBottomResize = (event) => {
                    document.removeEventListener("mousemove", onMouseMoveBottomResize);
                };

                const onMouseDownBottomResize = (event) => {
                    y = event.clientY;
                    const styles = window.getComputedStyle(resizeableEle);
                    // resizeableEle.style.top = styles.top;
                    // resizeableEle.style.bottom = null;
                    document.addEventListener("mousemove", onMouseMoveBottomResize);
                    document.addEventListener("mouseup", onMouseUpBottomResize);
                };

                // Left resize
                const onMouseMoveLeftResize = (event) => {
                    const dx = event.clientX - x;
                    x = event.clientX;
                    width = width - dx;
                    resizeableEle.style.width = `${width}px`;
                };

                const onMouseUpLeftResize = (event) => {
                    document.removeEventListener("mousemove", onMouseMoveLeftResize);
                };

                const onMouseDownLeftResize = (event) => {
                    x = event.clientX;
                    // resizeableEle.style.right = styles.right;
                    // resizeableEle.style.left = null;
                    document.addEventListener("mousemove", onMouseMoveLeftResize);
                    document.addEventListener("mouseup", onMouseUpLeftResize);
                };

                // Add mouse down event listener
                resizerRight = refRight.current[index];
                if (!resizerRight) return; // Check if resizeableEle is valid

                resizerRight.addEventListener("mousedown", onMouseDownRightResize);
                resizerTop = refTop.current[index];
                if (!resizerTop) return; // Check if resizeableEle is valid
                resizerTop.addEventListener("mousedown", onMouseDownTopResize);
                resizerBottom = refBottom.current[index];
                if (!resizerBottom) return; // Check if resizeableEle is valid
                resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
                resizerLeft = refLeft.current[index];
                if (!resizerLeft) return; // Check if resizeableEle is valid
                resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

                return () => {
                    resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
                    resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
                    resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
                    resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
                    // setSelectImageLayer((null)); setMenuPosition(null);
                };
            });
        }
        // }
    }, [textFields.length]);
    const [menuPosition, setMenuPosition] = useState(null)
    const [selectImageLayer, setSelectImageLayer] = useState(null);
    const [layerVisible, setLayerVisible] = useState("none");
    const [dragIndicator, setDragIndicator] = useState({ left: false, right: false, center: false, top: false, bottom: false })
    // addFields(addTextField);
    useEffect(() => {
        setTextFields(textFields)
    }, [])

    // useEffect(() => {
    //     const resizeObserver = new ResizeObserver(entries => {
    //         entries.forEach((entry, index) => {
    //             console.log(index)
    //             const { width, height } = entry.contentRect;
    //             const updateTextfield = [...textFields];
    //             updateTextfield[index].width = width
    //             updateTextfield[index].height = height

    //             // setTextFields(updateTextfield)
    //         });
    //     }, []);

    //     componentRef.current.forEach(divRef => {
    //         if (divRef) {
    //             resizeObserver.observe(divRef);
    //         }
    //     });

    //     return () => {
    //         componentRef.current.forEach(divRef => {
    //             if (divRef) {
    //                 resizeObserver.unobserve(divRef);
    //             }
    //         });
    //     };
    // }, [textFields.length]);
    const handleBringToForward = () => {
        const updatedImages = [...textFields];
        const updatedtextfield = [...textFields];
        let values1 = [0];
        let values2 = [0];
        let ind = Math.abs(selectImageLayer) - 1
        if (selectImageLayer < 0) {
            if (updatedImages.length > 0) {
                values1 = updatedImages
                    .map(obj => obj.z_index);
            }
            // console.log(updatedtextfield)
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
                setTextFields(updatedImages)
            }
            updatedImages[selectImageLayer].z_index = maxValue + 1;
            setTextFields(updatedImages)

        }

    }
    const handleSendToBack = () => {
        const updatedImages = [...textFields];
        const updatedtextfield = [...textFields];
        let values1 = [0];
        let values2 = [0];
        let ind = Math.abs(selectImageLayer) - 1
        if (selectImageLayer < 0) {
            if (updatedImages.length > 0) {
                values1 = updatedImages
                    .map(obj => obj.z_index);
            }
            // console.log(updatedtextfield)
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
            setTextFields(updatedImages)
        }

    }
    const handleSendBack = () => {
        const updatedImages = [...textFields];
        const updatedtextfield = [...textFields];
        // console.log(textFields)
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
                setTextFields(updatedImages)
            }
        }
    }
    const handleBringForward = () => {
        const updatedImages = [...textFields];
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
                setTextFields(updatedImages)
            }
        }
    }
    const rangeBorderChecker = (index) => {
        const updatedTextFields = [...textFields];
        // console.log(dragIndicator)
        // console.log("width", parseInt(updatedTextFields[index].x) + parseInt(updatedTextFields[index].width / 2))
        // console.log("height", parseInt(updatedTextFields[index].y) + parseInt(updatedTextFields[index].height / 2))
        if (parseInt(updatedTextFields[index].x) + parseInt(updatedTextFields[index].width / 2) > 215 && parseInt(updatedTextFields[index].x) < 330) {
            dragIndicator.left = true
            setDragIndicator(dragIndicator)
        }
        if (parseInt(updatedTextFields[index].y) + parseInt(updatedTextFields[index].height / 2) > 145 && parseInt(updatedTextFields[index].y) < 215) {
            dragIndicator.top = true
            setDragIndicator(dragIndicator)
        }
        if (parseInt(updatedTextFields[index].x) + parseInt(updatedTextFields[index].width / 2) < 215 || parseInt(updatedTextFields[index].x) > 235) {
            dragIndicator.left = false
            setDragIndicator(dragIndicator)
        }
        if (parseInt(updatedTextFields[index].y) + parseInt(updatedTextFields[index].height / 2) < 145 || parseInt(updatedTextFields[index].y) + parseInt(updatedTextFields[index].height / 2) > 215) {
            dragIndicator.top = false
            setDragIndicator(dragIndicator)
        }
    }
    const stop = (e, data, index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index].x = data.lastX;
        updatedTextFields[index].y = data.lastY;
        setTextFields(updatedTextFields);
        rangeBorderChecker(index)
    }
    const stopImage = (e, ui, index) => {
        const updatedTextFields = [...textFields];
        // const rect = e.getBoundingClientRect();

        console.log(e)
        updatedTextFields[index].x = ui.lastX;
        updatedTextFields[index].y = ui.lastY;
        setTextFields(updatedTextFields);
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
                        width: "900px",
                        height: "100%",
                        overflow: "hidden",
                        position: "relative", height: "620px"
                    }}
                >
                    <div>
                        <div style={{ display: dragIndicator.left == true ? "block" : "none", position: "absolute", left: "450px", top: "0px", width: ".1vh", height: "100%", background: "purple" }}></div>
                        <div style={{ display: dragIndicator.top == true ? "block" : "none", position: "absolute", left: "0px", top: "310px", width: "900px", height: ".1vh", background: "purple" }}></div>
                        <img src={selectedImage} style={{ width: "900px", height: "620px" }} />

                        {textFields.map((data, index) => {
                            {
                                if (data.type == "textfield") {
                                    console.log(data.x, data.y)
                                    return (
                                        <Draggable
                                            className="draggable"
                                            key={data.id}

                                            onDrag={(e, ui) => { stop(e, ui, index) }}
                                            onStop={(e, ui) => { stop(e, ui, index); setDragIndicator({ left: false, right: false, center: false, top: false, bottom: false }) }}
                                        >
                                            <div
                                                ref={el => (ref.current[index] = el)}
                                                onClick={(e) => { if (imageBorder != null && imageBorder == index) { setImageBorder(null) } else { setImageBorder(index) } }}
                                                onContextMenu={(e) => { setSelectImageLayer((index)); setMenuPosition(data); }}
                                                style={{
                                                    width: data.width + "px",
                                                    height: data.height + "px",
                                                    left: data.x + "px",
                                                    top: data.y + "px", textAlign: data.alignment, position: "absolute",
                                                    border: "none",
                                                }}
                                            >
                                                <div ref={el => (refLeft.current[index] = el)} style={{
                                                    width: imageBorder == index ? "3px" : "0px", zIndex: data.z_index + 1
                                                }} className="resizer resizer-l"></div>
                                                <div ref={el => (refTop.current[index] = el)} style={{
                                                    height: imageBorder == index ? "3px" : "0px", zIndex: data.z_index + 1
                                                }} className="resizer resizer-t"></div>
                                                <div style={{
                                                    width: imageBorder == index ? "3px" : "0px", zIndex: data.z_index + 1
                                                }} ref={el => (refRight.current[index] = el)} className="resizer resizer-r"></div>
                                                <div style={{
                                                    height: imageBorder == index ? "3px" : "0px", zIndex: data.z_index + 1
                                                }} ref={el => (refBottom.current[index] = el)} className="resizer resizer-b"></div>
                                                <textarea
                                                    onClick={(e) => { if (imageBorder != null && imageBorder == index) { setImageBorder(null) } else { setImageBorder(index) } }}
                                                    onContextMenu={(e) => { setSelectImageLayer((index)); setMenuPosition(data); }}
                                                    id='resize-component'
                                                    type="text"
                                                    value={data.text}
                                                    onChange={(e) => handleTextFieldChange(e, index)}
                                                    className="absolute border border-gray-400 bg-transparent text-black "
                                                    style={{
                                                        width: data.width + "px",
                                                        height: data.height + "px",
                                                        textAlign: data.alignment, overflow: "hidden", fontFamily: data.fontFamily, fontSize: parseInt(data.size),
                                                        fontWeight: data.bold,
                                                        textDecoration: data.underline,
                                                        fontStyle: data.italic
                                                        , textTransform: data.textOrientation,
                                                        color: "red",
                                                        // border: imageBorder == index ? "1px solid blue" : "none",
                                                        position: "absolute",
                                                        zIndex: data.z_index,
                                                        boxSizing: "content-box",
                                                        padding: "0",
                                                        border: "none",
                                                        outline: "none",
                                                        opacity: data.transparency / 100,

                                                    }}
                                                >

                                                </textarea>
                                            </div>

                                        </Draggable>
                                    )
                                } else {
                                    return (
                                        <Draggable
                                            defaultPosition={{ x: 100, y: 100 }}
                                            onDrag={(e, ui) => { stopImage(e, ui, index) }}
                                            className="draggableImage">

                                            <div
                                                ref={el => (ref.current[index] = el)}
                                                onClick={(e) => { if (imageBorder != null && imageBorder == index) { setImageBorder(null) } else { setImageBorder(index) } }} id='resize-component' onContextMenu={(e) => { setSelectImageLayer(index); setMenuPosition(data); }} style={{ zIndex: data.z_index, width: data.width + "px", height: data.height + "px", overflow: "auto", opacity: data.transparency / 100, position: "absolute", top: data.y + "px", left: data.x + "px", border: imageBorder == index ? "1px solid blue" : "none" }}>
                                                <div ref={el => (refLeft.current[index] = el)} style={{
                                                    width: imageBorder == index ? "3px" : "0px", zIndex: data.z_index + 1
                                                }} className="resizer resizer-l"></div>
                                                <div ref={el => (refTop.current[index] = el)} style={{
                                                    height: imageBorder == index ? "3px" : "0px", zIndex: data.z_index + 1
                                                }} className="resizer resizer-t"></div>
                                                <div style={{
                                                    width: imageBorder == index ? "3px" : "0px", zIndex: data.z_index + 1
                                                }} ref={el => (refRight.current[index] = el)} className="resizer resizer-r"></div>
                                                <div style={{
                                                    height: imageBorder == index ? "3px" : "0px", zIndex: data.z_index + 1
                                                }} ref={el => (refBottom.current[index] = el)} className="resizer resizer-b"></div>

                                                <img
                                                    onClick={(e) => { setSelectImageLayer(index); setMenuPosition(null); }} style={{
                                                        width: "100%", height: "100%",

                                                    }} src={data.src} />
                                            </div>
                                        </Draggable>
                                    )
                                }
                            }
                        })
                        }
                        {menuPosition && <div style={{ cursor: "pointer", zIndex: 300, border: "1px solid black", width: "25vh", height: "40vh", background: "white", boxShadow: " 4px 6px 22px 0px rgba(0,0,0,0.75)", color: "black", position: "absolute", top: (menuPosition.y + 50) + "px", left: (menuPosition.x + 100) + "px" }}>
                            {/* layer content */}
                            <div onMouseEnter={(e) => setLayerVisible("block")}
                                onMouseLeave={(e) => setLayerVisible("none")}

                                className='layer-class' onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Layer
                                <div onMouseEnter={(e) => setLayerVisible("block")} onMouseLeave={(e) => setLayerVisible("none")} className='layer-subclass' style={{ display: layerVisible, position: "absolute", top: "1vh", left: "10vh", background: "white", width: "25vh", border: "1px solid black" }}>
                                    <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Bring Forward</div>
                                    <div onClick={handleBringForward} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/bring-forward.png" alt="bring-forward" />Bring To Front</div>
                                    <div onClick={handleSendBack} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={sendBack.src} />sent Backward</div>
                                    <div onClick={handleSendToBack} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={sendToBack.src} />send to back</div>
                                </div>
                            </div>
                            {/* align content */}
                            <div onMouseEnter={(e) => setLayerVisible("block")}
                                onMouseLeave={(e) => setLayerVisible("none")} className='layer-class' onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/align-top.png" alt="align-top" />Align To Page
                                <div onMouseEnter={(e) => setLayerVisible("block")} onMouseLeave={(e) => setLayerVisible("none")} className='layer-subclass' style={{ display: layerVisible, position: "absolute", top: "1vh", left: "10vh", background: "white", width: "25vh", border: "1px solid black" }}>
                                    <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].x = 0; setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Left</div>
                                    <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].x = 205; setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Center</div>
                                    <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].x = 450 - (updateTextfield[selectImageLayer].width / 2); setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Right</div>
                                    <div style={{ width: "100%", height: ".5vh", borderBottom: "1px solid black" }}></div>
                                    <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Top</div>
                                    <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Middle</div>
                                    <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Bottom</div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ImageBanner;
