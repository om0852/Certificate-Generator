import ChooseTemplate from "./choosetemplate/page";
import { SessionProvider } from "next-auth/react"
import Navbar from "./component/Navbar";
import Home from "./component/Home";

export default function Page(
) {
  return (
    <>
      <div style={{width:"100%",height:"100vh",overflow:"hidden"}} >

        <Navbar />
        {/* <ChooseTemplate /> */}
        <Home/>
      </div>

    </>
  )
}