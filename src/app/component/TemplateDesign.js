"use client"
import "./component.css"
import Image from 'next/image'

export default function TemplateDesign({ templateimg }) {
    const img = templateimg?.trim()

    return (
        <>
            <div className="card">
                <img src={(img)} />
            </div>
        </>
    )
}