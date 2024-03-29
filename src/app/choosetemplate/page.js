"use client"
import { useEffect, useState } from "react";
import SideTemplate from "../component/SideTemplate";
import Slider from "../component/Slider";
import Link from "next/link";

export default function ChooseTemplate() {
    const [prevImage, setPrevImage] = useState("");
    return (
        <>
            <SideTemplate setPrevImage={setPrevImage} />
            <div style={{ display: "grid", placeItems: "center", width: "70%", height: "100vh" }} className="main-container">{prevImage ? <> <img style={{ width: "inherit", }} src={prevImage} /><Link style={{ background: "green", padding: "2vh 4vh", marginTop: "3vh" }} href={`/customizetemplate?id=${prevImage}`}>Use Template</Link> </> : <h2 style={{ textAlign: "center", color: "white", fontSize: "2em" }}>Select Template</h2>}</div >
        </>

    )
}