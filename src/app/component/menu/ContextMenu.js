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
    handleDeleteComponent,
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
    handleHistoryComponent,
    top,left
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
            <div style={{ cursor: "pointer", zIndex: 1300, width: "25vh", background: "white", color: "black", position: "absolute", top: top,left:left,boxShadow:"rgba(64, 87, 109, 0.07) 0px 0px 0px 1px, rgba(53, 71, 90, 0.2) 0px 2px 12px" }}>
                {/* layer content */}

                {menuPosition.type != "type" && <div onClick={(e) => {
                    handleCopyText()
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent:"space-evenly", borderBottom: "1px solid black" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="1.7em" height="1.7em"><path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z"></path></svg>Copy </div>}

                {copyText != null && menuPosition.type != "type" && <div onClick={(e) => {
                    if (copyText != null) {
                        const updatedata = [...textFields];
                        updatedata[selectImageLayer].text += copyText;
                        setCopyText(null)
                    }
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="1.7em" height="1.7em"><path d="M200 32h-36.26a47.92 47.92 0 0 0-71.48 0H56a16 16 0 0 0-16 16v168a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm-72 0a32 32 0 0 1 32 32H96a32 32 0 0 1 32-32Zm72 184H56V48h26.75A47.93 47.93 0 0 0 80 64v8a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-8a47.93 47.93 0 0 0-2.75-16H200Z"></path></svg>Paste</div>}

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
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3.5H5a.5.5 0 0 0-.5.5v1.5A.5.5 0 0 0 5 6h11a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5ZM5 2a2 2 0 0 0-2 2v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-.25h.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-5.75a2.25 2.25 0 0 0-2.25 2.25v1.563A2 2 0 0 0 9 15v5a2 2 0 0 0 2 2h.5a2 2 0 0 0 2-2v-5a2 2 0 0 0-1.5-1.937V11.5a.75.75 0 0 1 .75-.75h5.75a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25h-.515A2 2 0 0 0 16 2H5Zm7 13a.5.5 0 0 0-.5-.5H11a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-5Z" fill="currentColor"></path></svg>Copy Style</div>}
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
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3.5H5a.5.5 0 0 0-.5.5v1.5A.5.5 0 0 0 5 6h11a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5ZM5 2a2 2 0 0 0-2 2v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-.25h.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-5.75a2.25 2.25 0 0 0-2.25 2.25v1.563A2 2 0 0 0 9 15v5a2 2 0 0 0 2 2h.5a2 2 0 0 0 2-2v-5a2 2 0 0 0-1.5-1.937V11.5a.75.75 0 0 1 .75-.75h5.75a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25h-.515A2 2 0 0 0 16 2H5Zm7 13a.5.5 0 0 0-.5-.5H11a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-5Z" fill="currentColor"></path><path fill="currentColor" d="M4 3h13v4H4z"></path></svg>Paste Style</div>}
                <div onClick={(e) => {handleDuplicateComponent()
                   
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="1.7em" height="1.7em"><path fill="none" d="M0 0h256v256H0z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M168 168h48V40H88v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M40 88h128v128H40z"></path><path fill="currentColor" d="M138.14 152.43a4.46 4.46 0 0 1-4.45 4.46h-25.26v25.25a4.46 4.46 0 0 1-8.92 0v-25.25H74.26a4.46 4.46 0 0 1 0-8.92h25.25v-25.26a4.46 4.46 0 0 1 8.92 0V148h25.26a4.46 4.46 0 0 1 4.45 4.43Z"></path></svg>Duplicate</div>

<div onClick={(e) => {
                                                handleDeleteComponent(selectImageLayer)

                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent:"space-evenly", borderBottom: "1px solid black" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="1.7em" height="1.7em"><path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"></path></svg>Delete </div>

      
                <div onMouseEnter={(e) => { handleHoverState("block", "layer"); setLayerVisible("block") }} onMouseLeave={(e) => handleHoverState("none", "layer")}
                    className='layer-classname-container' onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.474 12.838 1.697.835a1 1 0 0 1 0 1.795L13.32 19.33a3 3 0 0 1-2.649 0L2.82 15.468a1 1 0 0 1 0-1.795l1.697-.835 1.698.836-1.821.896 6.94 3.415a1.5 1.5 0 0 0 1.324 0l6.94-3.415-1.822-.896 1.7-.836ZM13.32 4.673l7.852 3.864a1 1 0 0 1 0 1.794l-7.852 3.864a3 3 0 0 1-2.649 0L2.82 10.33a1 1 0 0 1 0-1.794l7.851-3.864a3 3 0 0 1 2.65 0Zm-1.986 8.176a1.5 1.5 0 0 0 1.324 0l6.94-3.415-6.94-3.415a1.5 1.5 0 0 0-1.324 0l-6.94 3.415 6.94 3.415Z"></path></svg>Layer
                    <div onMouseEnter={(e) => handleHoverState("block", "layer")} onMouseLeave={(e) => handleHoverState("none", "layer")} className='layer-subclass' style={{ display: hoverStateTracker[0].layer == "block" ? "block" : "none", position: "absolute", top: "1vh", left: "10vh", background: "white", width: "25vh", border: "1px solid black" }}>
                        <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Bring Forward</div>
                        <div onClick={handleBringForward} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/bring-forward.png" alt="bring-forward" />Bring To Front</div>
                        <div onClick={handleSendBack} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={sendBack.src} />sent Backward</div>
                        <div onClick={handleSendToBack} style={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={sendToBack.src} />send to back</div>
                    </div>
                </div>
                {/* align content */}
                <div onMouseEnter={(e) => handleHoverState("block", "alignTo")}
                    onMouseLeave={(e) => handleHoverState("none", "alignTo")} onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="1.7em" height="1.7em"><path d="M48 40v176a8 8 0 0 1-16 0V40a8 8 0 0 1 16 0Zm16 64V64a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v40a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16Zm16 0h96V64H80Zm152 48v40a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16v-40a16 16 0 0 1 16-16h136a16 16 0 0 1 16 16Zm-16 40v-40H80v40h136Z"></path></svg>Align To Page
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
                }} className='layer-classname-container' style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="1.7em" height="1.7em"><path d="M128 112a28 28 0 0 0-8 54.83V184a8 8 0 0 0 16 0v-17.17a28 28 0 0 0-8-54.83Zm0 40a12 12 0 1 1 12-12 12 12 0 0 1-12 12Zm80-72h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16ZM96 56a32 32 0 0 1 64 0v24H96Zm112 152H48V96h160v112Z"></path></svg>Lock </div>

            </div >
        </>
    )
}