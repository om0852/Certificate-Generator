"use client"
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import "./component.css"
import sendToBack from "../../images/send to back.png";
import sendBack from "../../images/send back.png"
import bringToForward from "../../images/bring to forward.png"
import ContextMenu from './menu/ContextMenu';
const ImageBanner = ({ addFields, setTextFields, certificateRef, selectedTextFieldIndex, selectedImage, textFields, selectImageLayer, setSelectImageLayer, handleRadioChange, historyComponent, imageBorder, setImageBorder, handleHistoryComponent }) => {
    const [showInsideBorder, setShowInsideBorder] = useState([{ left: false, right: false }]);
    const [copyStyle, setCopyStyle] = useState(null);
    const [showBorder, setShowBorder] = useState(null);
    const [menuPosition, setMenuPosition] = useState(null)
    const [layerVisible, setLayerVisible] = useState("none");
    const [dragIndicator, setDragIndicator] = useState({ left: false, right: false, center: false, top: false, bottom: false })
    const ref = useRef([]);
    const refLeft = useRef([]);
    const refTop = useRef([]);
    const refRight = useRef([]);
    const refBottom = useRef([]);
    const [copyText, setCopyText] = useState(null);

    // Function to copy text to clipboard
    const copyToClipboard = () => {
        const selection = window.getSelection();
        if (selection) {
            const selectedText = selection.toString();
            if (selectedText != "") {

                navigator.clipboard.writeText(selectedText)
                    .then(() => {
                        setCopyText(selectedText); // Update the copyText state
                        console.log('Text copied to clipboard:', selectedText, selection);
                        // You can add any additional actions after successful copy
                    })
                    .catch(err => {
                        console.error('Failed to copy text:', err);
                    });
            }
        }
    };

    // Function to handle copying text
    const handleCopyText = () => {
        copyToClipboard();
    };

    const handleLockComponent = () => {
        const updatedata = [...textFields];
        if (updatedata[selectImageLayer].isLocked == true) {
            updatedata[selectImageLayer].isLocked = false;
        } else {
            updatedata[selectImageLayer].isLocked = true
        }
        setTextFields(updatedata);
        handleHistoryComponent();

    }
    useEffect(() => {
        // if (imageBorder != null) {
        // console.log(ref.current)
        // console.log(refLeft.current[0])
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
                    const updateTextfield = [...textFields];
                    updateTextfield[index].width = divRef.offsetWidth;
                    updateTextfield[index].height = divRef.offsetHeight;
                    setTextFields(updateTextfield);
                    rangeBorderChecker(index)
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
                    const updateTextfield = [...textFields];
                    updateTextfield[index].width = divRef.offsetWidth;
                    updateTextfield[index].height = divRef.offsetHeight;
                    setTextFields(updateTextfield);
                    rangeBorderChecker(index)

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
                    const updateTextfield = [...textFields];
                    updateTextfield[index].width = divRef.offsetWidth;
                    updateTextfield[index].height = divRef.offsetHeight;
                    setTextFields(updateTextfield);
                    rangeBorderChecker(index)

                    resizeableEle.style.height = `${height}px`;
                };

                const onMouseUpBottomResize = (event) => {
                    document.removeEventListener("mousemove", onMouseMoveBottomResize);
                };

                const onMouseDownBottomResize = (event) => {
                    y = event.clientY;
                    const styles = window.getComputedStyle(resizeableEle);
                    const updateTextfield = [...textFields];
                    updateTextfield[index].width = divRef.offsetWidth;
                    updateTextfield[index].height = divRef.offsetHeight;
                    setTextFields(updateTextfield);
                    rangeBorderChecker(index)

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
                    console.log(x)

                    // resizeableEle.style.right = styles.right;
                    // resizeableEle.style.left = null;
                    const updateTextfield = [...textFields];
                    updateTextfield[index].width = divRef.offsetWidth;
                    updateTextfield[index].height = divRef.offsetHeight;
                    setTextFields(updateTextfield);
                    rangeBorderChecker(index)

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
    // addFields(addTextField);
    // useEffect(() => {
    //     setTextFields(textFields)
    // }, [])

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
    useEffect(() => {
        // console.log(textFields)
        // console.log(selectImageLayer)
    }, [textFields])
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
        if (parseInt(updatedTextFields[index].y) + parseInt(updatedTextFields[index].height / 2) > 145 && parseInt(updatedTextFields[index].y) < 160) {
            dragIndicator.top = true
            setDragIndicator(dragIndicator)
        }
        if (parseInt(updatedTextFields[index].x) + parseInt(updatedTextFields[index].width / 2) < 215 || parseInt(updatedTextFields[index].x) > 235) {
            dragIndicator.left = false
            setDragIndicator(dragIndicator)
        }
        if (parseInt(updatedTextFields[index].y) + parseInt(updatedTextFields[index].height / 2) < 145 || parseInt(updatedTextFields[index].y) > 160) {
            dragIndicator.top = false
            setDragIndicator(dragIndicator)
        }
        // console.log(parseInt(updatedTextFields[index].y) + parseInt(updatedTextFields[index].height / 4))
        if (parseInt(updatedTextFields[index].x) + parseInt(updatedTextFields[index].width / 4) == 225) {
            const updateborder = [...showInsideBorder];
            updateborder[0].left = true;
            setShowInsideBorder(updateborder);

        }
        else {

            const updateborder = [...showInsideBorder];
            updateborder[0].left = false;
            setShowInsideBorder(updateborder);
        }
        if (parseInt(updatedTextFields[index].y) + parseInt(updatedTextFields[index].height / 4) == 155) {

            const updateborder = [...showInsideBorder];
            updateborder[0].right = true;
            setShowInsideBorder(updateborder);
        }
        else {

            const updateborder = [...showInsideBorder];
            updateborder[0].right = false;
            setShowInsideBorder(updateborder);
        }
    }
    const stop = (e, data, index) => {
        if (textFields[index].isLocked == false) {
            const updatedTextFields = [...textFields];
            updatedTextFields[index].x = data.lastX;
            updatedTextFields[index].y = data.lastY;
            setTextFields(updatedTextFields);
            rangeBorderChecker(index)

        }
    }
    const stopImage = (e, ui, index) => {
        if (textFields[index].isLocked == false) {

            const updatedTextFields = [...textFields];

            updatedTextFields[index].x = ui.lastX;
            updatedTextFields[index].y = ui.lastY;
            setTextFields(updatedTextFields);
            rangeBorderChecker(index)

        }
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

            {selectedImage ? "" : <div style={{ width: "691.5px", height: "462px", display: "grid", placeItems: "center", fontSize: 25 }}>Select Certificate Template</div>}
            {selectedImage && (

                <div
                    className="mt-4 w-full h-40 md:h-48 lg:h-64 bg-cover bg-center"
                    style={{
                        width: "900px",
                        height: "100%",
                        overflow: "hidden",
                        position: "relative", height: "620px"
                    }}
                >
                    <div ref={certificateRef}>
                        <div style={{ display: dragIndicator.left == true ? "block" : "none", position: "absolute", left: "450px", top: "0px", width: ".1vh", height: "100%", background: "purple" }}></div>
                        <div style={{ display: dragIndicator.top == true ? "block" : "none", position: "absolute", left: "0px", top: "310px", width: "900px", height: ".1vh", background: "purple" }}></div>
                        <img src={selectedImage} style={{ width: "900px", height: "620px" }} />

                        {textFields.map((data, index) => {
                            {
                                if (data.type == "textfield") {
                                    // console.log(data.x, data.y)
                                    return (
                                        <>
                                            {data.isLocked == false ? <Draggable
                                                key={index}
                                                defaultPosition={{ x: 0, y: 0 }}
                                                position={{ x: data.x, y: data.y }}
                                                onStart={(e, ui) => { console.log(ui); stop(e, ui, index) }}
                                                onDrag={(e, ui) => { stop(e, ui, index) }}
                                                onStop={(e, ui) => {
                                                    stop(e, ui, index);
                                                    const updatedata = [...showInsideBorder];
                                                    updatedata.left = false;
                                                    updatedata.right = false;

                                                    setShowInsideBorder(showInsideBorder);
                                                    setDragIndicator({ left: false, right: false, center: false, top: false, bottom: false });
                                                    if (ui.lastX != historyComponent[historyComponent.length - 1][index].x || ui.lastY != historyComponent[historyComponent.length - 1][index].y) {

                                                        handleHistoryComponent();
                                                    }



                                                }}
                                            >
                                                <div
                                                    key={index}
                                                    ref={el => (ref.current[index] = el)}
                                                    onClick={(e) => { if (imageBorder != null && imageBorder == index && data.isLocked == false) { setImageBorder(null) } else { setImageBorder(index) } }}
                                                    onContextMenu={(e) => { setSelectImageLayer((index)); setMenuPosition(data); }}
                                                    style={{
                                                        width: data.width + "px",
                                                        height: data.height + "px",
                                                        left: data.x,
                                                        top: data.y, textAlign: data.alignment, position: "absolute",
                                                        border: "none",
                                                        zIndex: imageBorder == index && data.isLocked == false ? 1005 : 1000
                                                    }}
                                                >
                                                    <div ref={el => (refLeft.current[index] = el)} style={{
                                                        width: imageBorder == index && data.isLocked == false ? "0.5px" : "0px", zIndex: data.z_index + 1
                                                    }} className="resizer resizer-l"></div>
                                                    <div ref={el => (refTop.current[index] = el)} style={{
                                                        height: imageBorder == index && data.isLocked == false ? "0.5px" : "0px", zIndex: data.z_index + 1
                                                    }} className="resizer resizer-t"></div>
                                                    <div style={{
                                                        width: imageBorder == index && data.isLocked == false ? "1.5px" : "0px", zIndex: data.z_index + 1
                                                    }} ref={el => (refRight.current[index] = el)} className="resizer resizer-r"></div>
                                                    <div style={{
                                                        height: imageBorder == index && data.isLocked == false ? "0.5px" : "0px", zIndex: data.z_index + 1
                                                    }} ref={el => (refBottom.current[index] = el)} className="resizer resizer-b"></div>
                                                    <div style={{ display: index == imageBorder ? showInsideBorder[0].left == false ? "none" : "block" : "none", width: "1px", height: "100%", background: "red", left: "50%", position: "absolute", zIndex: 1000 }}></div>
                                                    <div style={{ height: "1px", display: index == imageBorder ? showInsideBorder[0].right == false ? "none" : "block" : "none", width: "100%", background: "red", top: "50%", position: "absolute", }}></div>
                                                    <textarea
                                                        onContextMenu={(e) => { if (data.isLocked == false) { setSelectImageLayer((index)); setMenuPosition(data); } }}
                                                        id='resize-component'
                                                        type="text"
                                                        value={data.text}
                                                        onClick={(e) => handleRadioChange(index)}
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

                                                            // border: imageBorder == index && data.isLocked==false ? "1px solid blue" : "none",
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

                                            </Draggable> : <div
                                                key={index}
                                                ref={el => (ref.current[index] = el)}
                                                onClick={(e) => {
                                                    if (showBorder == null && showBorder != index) {
                                                        setShowBorder(index)
                                                    } else { setShowBorder(null) }
                                                }}
                                                style={{
                                                    width: data.width + "px",
                                                    height: data.height + "px",
                                                    left: data.x,
                                                    top: data.y, textAlign: data.alignment, position: "absolute",
                                                    border: showBorder == index ? "3px solid black" : "none",
                                                    boxSizing: "content-box",
                                                    zIndex: imageBorder == index && data.isLocked == false ? 1005 : 1000
                                                }}
                                            >
                                                {showBorder == index ? <img onClick={(e) => { const updatedata = [...textFields]; updatedata[showBorder].isLocked = false; setTextFields(updatedata); }} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1200, cursor: "pointer" }} width="48" height="48" src="https://img.icons8.com/color/48/lock--v1.png" alt="lock--v1" /> : ""}

                                                <textarea
                                                    onContextMenu={(e) => { if (data.isLocked == false) { setSelectImageLayer((index)); setMenuPosition(data); } }}
                                                    id='resize-component'
                                                    type="text"
                                                    value={data.text}
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

                                                        // border: imageBorder == index && data.isLocked==false ? "1px solid blue" : "none",
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
                                            }
                                        </>
                                    )
                                } else {
                                    return (
                                        <Draggable
                                            className="draggable"
                                            defaultPosition={{ x: 100, y: 100 }}
                                            position={{ x: data.x, y: data.y }}
                                            key={index}
                                            onDrag={(e, ui) => {
                                                stopImage(e, ui, index);
                                            }}
                                            onStop={(e, ui) => {
                                                const updatedata = [...showInsideBorder];
                                                updatedata.left = false;
                                                updatedata.right = false;

                                                setShowInsideBorder(showInsideBorder);
                                                //  stop(e, ui, index); 
                                                setDragIndicator({ left: false, right: false, center: false, top: false, bottom: false });
                                                // console.log(historyComponent[historyComponent.length - 1][0][index])
                                                if (ui.lastX != historyComponent[historyComponent.length - 1][index].x || ui.lastY != historyComponent[historyComponent.length - 1][index].y) {

                                                    handleHistoryComponent();
                                                }


                                            }}


                                        >

                                            <div
                                                key={index}

                                                ref={el => (ref.current[index] = el)}
                                                onClick={(e) => { if (imageBorder != null && imageBorder == index && data.isLocked == false) { setImageBorder(null) } else { setImageBorder(index) } }} id='resize-component' onContextMenu={(e) => { setSelectImageLayer(index); setMenuPosition(data); }} style={{ zIndex: data.z_index, width: data.width + "px", height: data.height + "px", overflow: "auto", opacity: data.transparency / 100, position: "absolute", top: data.y + "px", left: data.x + "px", border: imageBorder == index && data.isLocked == false ? "1px solid blue" : "none", zIndex: imageBorder == index && data.isLocked == false ? 1005 : 1000 }}>
                                                <div ref={el => (refLeft.current[index] = el)} style={{
                                                    width: imageBorder == index && data.isLocked == false ? "1.5px" : "0px", zIndex: data.z_index + 1
                                                }} className="resizer resizer-l"></div>
                                                <div ref={el => (refTop.current[index] = el)} style={{
                                                    height: imageBorder == index && data.isLocked == false ? "1.5px" : "0px", zIndex: data.z_index + 1
                                                }} className="resizer resizer-t"></div>
                                                <div style={{
                                                    width: imageBorder == index && data.isLocked == false ? "1.5px" : "0px", zIndex: data.z_index + 1
                                                }} ref={el => (refRight.current[index] = el)} className="resizer resizer-r"></div>
                                                <div style={{
                                                    height: imageBorder == index && data.isLocked == false ? "1.5px" : "0px", zIndex: data.z_index + 1
                                                }} ref={el => (refBottom.current[index] = el)} className="resizer resizer-b"></div>
                                                <div style={{ display: index == imageBorder ? showInsideBorder[0].left == false ? "none" : "block" : "none", width: "1px", height: "100%", background: "red", left: "50%", position: "absolute", zIndex: 1000 }}></div>
                                                <div style={{ height: "1px", display: index == imageBorder ? showInsideBorder[0].right == false ? "none" : "block" : "none", width: "100%", background: "red", top: "50%", position: "absolute", zIndex: 1000 }}></div>

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
                        {menuPosition && <ContextMenu
                            menuPosition={menuPosition}
                            sendBack={sendBack}
                            sendToBack={sendToBack}
                            setLayerVisible={setLayerVisible}
                            handleSendBack={handleSendBack}
                            handleBringForward={handleBringForward}
                            layerVisible={layerVisible}
                            handleBringToForward={handleBringToForward}
                            bringToForward={bringToForward}
                            handleSendToBack={handleSendToBack}
                            handleLockComponent={handleLockComponent}
                            textFields={textFields}
                            selectImageLayer={selectImageLayer}
                            setTextFields={setTextFields}
                            copyStyle={copyStyle}
                            setCopyStyle={setCopyStyle}
                            handleCopyText={handleCopyText}
                            copyText={copyText}
                            setCopyText={setCopyText}
                        />}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ImageBanner;
