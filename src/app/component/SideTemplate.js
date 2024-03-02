import TemplateDesign from "./TemplateDesign"
import "./component.css"
import createTemplateIcon from "../../images/create_template_icon.gif"
import Link from "next/link"
import certificate1 from "../../images/certificates/certificate1.png"
import certificate2 from "../../images/certificates/certificate2.png"
import certificate3 from "../../images/certificates/certificate3.png"
import certificate4 from "../../images/certificates/certificate4.png"
import certificate5 from "../../images/certificates/certificate5.png"
export default function SideTemplate({ setPrevImage }) {
   
    return (
        <>
            <div className="sidebar-template">
                <Link href={"/createcertificate"} className="create-card">
                    <img src={createTemplateIcon.src} />
                </Link>

                <TemplateDesign setPrevImage={setPrevImage} templateimg={certificate1.src} />
                <TemplateDesign setPrevImage={setPrevImage} templateimg={certificate2.src} />
                <TemplateDesign setPrevImage={setPrevImage} templateimg={certificate3.src} />
                <TemplateDesign setPrevImage={setPrevImage} templateimg={certificate4.src} />
                <TemplateDesign setPrevImage={setPrevImage} templateimg={certificate5.src} />

            </div>
        </>
    )
}