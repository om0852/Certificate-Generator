import ChooseTemplate from "./choosetemplate/page";
import { SessionProvider } from "next-auth/react"
import Navbar from "./component/Navbar";

export default function Page(
) {
  return (
    <>
      <div>

        <Navbar />
        <ChooseTemplate />
      </div>

    </>
  )
}