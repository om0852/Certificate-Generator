"use client"
import { useEffect, useState, useContext } from "react";
import "./menu.css";
import paste_style from "../../../images/paste_style.png"
export default function ContextMenu({
    setLayerVisible,
    handleSendBack,
    handleBringForward,
    sendToBack,
    menuPosition,
    selectImageLayer,
    handleDuplicateComponent,
    textFields,
    setTextFields,
    sendBack,
    handleBringToForward,
    bringToForward,
    handleSendToBack,
    copyStyle,
    setCopyStyle,
    copyText,
    setCopyText,
    handleCopyText,
    handleLockComponent,
    handleHistoryComponent
}) {

    const [hoverStateTracker, setHoverStateTracker] = useState([{ layer: "none", alignTo: "none" }])

    const handleHoverState = (style, state) => {
        const updatedata = [...hoverStateTracker];
        for (let i in hoverStateTracker) {
            updatedata[0][i] = "none"
        }
        if (state != "none") {

            updatedata[0][state] = style;
        }
        setHoverStateTracker(updatedata);
        // console.log("use", hoverStateTracker[0])

    }
    return (
        <>
            <div style={{ cursor: "pointer", zIndex: 1300, border: "1px solid black", width: "25vh", background: "white", boxShadow: " 4px 6px 22px 0px rgba(0,0,0,0.75)", color: "black", position: "absolute", top: (menuPosition.y + 30) + "px", left: (menuPosition.x + 100) + "px" }}>
                {/* layer content */}

                {menuPosition.type != "type" && <div onClick={(e) => {
                    handleCopyText()
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/copy--v1.png" alt="copy--v1" />Copy </div>}

                {copyText != null && menuPosition.type != "type" && <div onClick={(e) => {
                    if (copyText != null) {
                        const updatedata = [...textFields];
                        updatedata[selectImageLayer].text += copyText;
                        setCopyText(null)
                    }
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios-filled/30/paste.png" alt="paste" />Paste</div>}

                {menuPosition.type != "type" && <div onClick={(e) => {
                    const data = {
                        fontFamily: textFields[selectImageLayer].fontFamily,
                        size: textFields[selectImageLayer].size,
                        bold: textFields[selectImageLayer].bold,
                        italic: textFields[selectImageLayer].italic,
                        alignment: textFields[selectImageLayer].alignment,
                        underline: textFields[selectImageLayer].underline,
                        textOrientation: textFields[selectImageLayer].textOrientation,
                        color: textFields[selectImageLayer].color
                    }
                    setCopyStyle(data)
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios/30/copy--v1.png" alt="copy--v1" />Copy Style</div>}
                {copyStyle != null && menuPosition.type != "type" && <div onClick={(e) => {
                    if (copyStyle == null) { } else {
                        const updatedata = [...textFields];
                        updatedata[selectImageLayer].fontFamily = copyStyle.fontFamily;
                        updatedata[selectImageLayer].size = copyStyle.size;
                        updatedata[selectImageLayer].bold = copyStyle.bold;
                        updatedata[selectImageLayer].italic = copyStyle.italic;
                        updatedata[selectImageLayer].alignment = copyStyle.alignment;
                        updatedata[selectImageLayer].underline = copyStyle.underline;
                        updatedata[selectImageLayer].textOrientation = copyStyle.textOrientation;
                        updatedata[selectImageLayer].color = copyStyle.color;
                        setTextFields(updatedata);
                        setCopyStyle(null)
                        console.log("done")
                    }
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={paste_style.src} />Paste Style</div>}
                <div onClick={(e) => {handleDuplicateComponent
                   
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios-filled/30/duplicate.png" alt="duplicate" />Duplicate</div>
                <div onMouseEnter={(e) => { handleHoverState("block", "layer"); setLayerVisible("block") }} onMouseLeave={(e) => handleHoverState("none", "layer")}
                    className='layer-classname-container' onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Layer
                    <div onMouseEnter={(e) => handleHoverState("block", "layer")} onMouseLeave={(e) => handleHoverState("none", "layer")} className='layer-subclass' style={{ display: hoverStateTracker[0].layer == "block" ? "block" : "none", position: "absolute", top: "1vh", left: "10vh", background: "white", width: "25vh", border: "1px solid black" }}>
                        <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Bring Forward</div>
                        <div onClick={handleBringForward} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/bring-forward.png" alt="bring-forward" />Bring To Front</div>
                        <div onClick={handleSendBack} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={sendBack.src} />sent Backward</div>
                        <div onClick={handleSendToBack} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={sendToBack.src} />send to back</div>
                    </div>
                </div>
                {/* align content */}
                <div onMouseEnter={(e) => handleHoverState("block", "alignTo")}
                    onMouseLeave={(e) => handleHoverState("none", "alignTo")} onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/align-top.png" alt="align-top" />Align To Page
                    <div onMouseEnter={(e) => handleHoverState("block", "alignTo")} onMouseLeave={(e) => handleHoverState("none", "alignTo")} style={{ display: hoverStateTracker[0].alignTo == "block" ? "block" : "none", position: "absolute", top: "1vh", left: "10vh", background: "white", width: "25vh", border: "1px solid black" }}>
                        <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].x = 0; setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Left</div>
                        <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].x = 175; setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Center</div>
                        <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].x = 430 - (updateTextfield[selectImageLayer].width / 2); setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Right</div>
                        <div style={{ width: "100%", height: ".5vh", borderBottom: "1px solid black" }}></div>
                        <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].y = 0; setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Top</div>
                        <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].y = 105 + (updateTextfield[selectImageLayer].height / 4); setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Middle</div>
                        <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].y = 310 - (updateTextfield[selectImageLayer].height / 2); setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Bottom</div>
                    </div>

                </div>
                <div onClick={(e) => {
                    handleLockComponent()
                    handleHistoryComponent();
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/copy--v1.png" alt="copy--v1" />{textFields[selectImageLayer].isLocked ? "Unlock" : "Lock"} </div>

            </div >
        </>
    )
}