import "./component.css"
import cert from "../../images/certificate_template1.webp"
export default function TemplateDesign({ templateimg }) {
    return (
        <>
            <div className="card">
                <img src={cert.src} />
            </div>
        </>
    )
}