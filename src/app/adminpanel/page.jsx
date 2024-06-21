import Link from "next/link";

export default function Page(){
    return(
        <>
        <div style={{width:"100%",height:"10vh",margin:"2vh"}}>
            <Link href={"/adminpanel/addshape"}>
            Add Shapes
            </Link>
            </div>
        </>

    )
}