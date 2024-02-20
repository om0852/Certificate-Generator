"use client"
import Link from "next/link"
import "./component.css"
import Image from 'next/image'

export default function TemplateDesign({ templateimg, setPrevImage }) {
    const img = templateimg?.trim()
    const handleImage = (data) => {
        console.log(data)
        setPrevImage(data);
    }
    return (
        <>
            <div className="card">
                <img onClick={(e) => { setPrevImage(img) }} src={(img)} />
            </div>
        </>
    )
}