"use client"
import { useEffect, useState } from "react";
import "./menu.css";
export default function ContextMenu({
    setLayerVisible,
    handleSendBack,
    handleBringForward,
    sendToBack,
    layerVisible,
    menuPosition,
    sendBack,
    handleBringToForward,
    bringToForward,
    handleSendToBack

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
    // useEffect(() => {
    //     console.log("use", hoverStateTracker[0])

    // }, [hoverStateTracker])
    return (
        <>
            <div style={{ cursor: "pointer", zIndex: 1300, border: "1px solid black", width: "25vh", height: "40vh", background: "white", boxShadow: " 4px 6px 22px 0px rgba(0,0,0,0.75)", color: "black", position: "absolute", top: (menuPosition.y + 50) + "px", left: (menuPosition.x + 100) + "px" }}>
                {/* layer content */}
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
                        <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].x = 205; setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Center</div>
                        <div onClick={(e) => { const updateTextfield = [...textFields]; updateTextfield[selectImageLayer].x = 450 - (updateTextfield[selectImageLayer].width / 2); setTextFields(updateTextfield) }} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Right</div>
                        <div style={{ width: "100%", height: ".5vh", borderBottom: "1px solid black" }}></div>
                        <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Top</div>
                        <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Middle</div>
                        <div onClick={handleBringToForward} style={{ fontSize: 15, height: "10vh", display: "flex", alignItems: "center", justifyContent: "space-around", borderBottom: "1px solid black" }}><img width="30" height="30" src={bringToForward.src} />Bottom</div>
                    </div>
                </div>
            </div>
        </>
    )
}