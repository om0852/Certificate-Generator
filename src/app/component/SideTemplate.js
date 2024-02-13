import TemplateDesign from "./TemplateDesign"
import "./component.css"
import createTemplateIcon from "../../images/create_template_icon.gif"
import Link from "next/link"

export default function SideTemplate() {
    return (
        <>
            <div className="sidebar-template">
                <Link href={"/createcertificate"} className="create-card">
                    <img src={createTemplateIcon.src} />
                </Link>
                <TemplateDesign templateimg={"../image"} />
                <TemplateDesign templateimg={"../image"} />
                <TemplateDesign templateimg={"../image"} />
                <TemplateDesign templateimg={"../image"} />
            </div>
        </>
    )
}