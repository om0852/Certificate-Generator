"use client"
import hellovideo from "@/app/video/hello.mp4"
import "@/app/globals.css"
import Link from "next/link"
export default function Home(){
return(
    <>
    <div className="home-background" style={{display:"grid",placeItems:"center",width:"100%",height:"100%"

}}>
    <div style={{width:"70%",height:"100%",margin:" 10vh auto 0 auto",textAlign:"center"}}>

    <h1 className="gradient-text" style={{color:"white",fontSize:"6em",fontFamily:"fantasy"}}>Hello</h1>
    <h3 className="gradient-text gradient-text2" style={{color:"white",fontSize:"4em",fontFamily:"revert-layer"}}>Lets make Creative Design</h3>
    <h3 className="gradient-text gradient-text3" style={{color:"white",fontSize:"3em",fontFamily:"fantasy"}}>With Certify</h3>

  
<Link href={"/choosetemplate"} class="btn" style={{background:"#0a91ef",color:"white",height:"10vh"}}>Create Certificate </Link>
  </div>
    </div>
    </>
)
}