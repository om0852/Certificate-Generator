"use client";
import "@/app/globals.css";
import { useState } from "react";
import dashboardItems, { dateModified } from "./menuoptions";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("Project");
  const [selectedMenu2, setSelectedMenu2] = useState("");
  const [selectOwner,setSelectOwner]=useState("owner");
  const [selectDateModified,setSelectDateModified]=useState("Today");

  return (
    <>
      <div className="w h flex" >
        <div
          className="w-4 h"
          style={{
            background: "#f9f9f9",
          }}
          
        >
          <div className="dashboard-container" onMouseDown={()=>{if(selectedMenu2!="")setSelectedMenu2("")}}>
            <div className="dashboard-title">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material/24/dashboard-layout.png"
                alt="dashboard-layout"
              />
              Dashboard
            </div>
            <div style={{ margin: "1vh auto", width: "90%", height: "5vh" }}>
              OVERVIEW
            </div>
            {dashboardItems.map((data, index) => {
              if (data.text == "Home") {
                return (
                  <div
                    key={index}
                    onClick={() => router.push("/")}
                    className="dashboard-card"
                  >
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/material-sharp/24/sort-right.png"
                      alt="sort-right"
                    />
                    <img
                      width="24"
                      height="24"
                      src={data.img}
                      alt="group-of-projects"
                    />{" "}
                    {data.text}
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedMenu(data.text)}
                    className="dashboard-card"
                  >
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/material-sharp/24/sort-right.png"
                      alt="sort-right"
                    />
                    <img
                      width="24"
                      height="24"
                      src={data.img}
                      alt="group-of-projects"
                    />{" "}
                    {data.text}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="w" style={{ background: "white" }}>
          <div style={{ width: "95%", height: "100%", margin: "auto" }}>
            <div
              className="w h-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="background-image"
                style={{
                  display: "flex",
                  margin: "auto",
                  alignItems: "end",
                  width: "100%",
                  height: "90%",
                  borderRadius: "1.4vh",
                }}
              >
                <span
                  style={{
                    fontSize: "3.4em",
                    fontWeight: "500",
                    bottom: "4vh",
                    left: "2%",
                    position: "relative",
                  }}
                >
                  {selectedMenu}
                </span>
              </div>
            </div>
            <div className="dashboard-edit-container">
                <span>

                <div  className="dashboard-edit-container-button" onMouseUp={()=>setSelectedMenu2("owner")}>{selectOwner} <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/chevron-down.png" alt="chevron-down"/>
                <div className="dashboard-menucard" style={{display:selectedMenu2=="owner"?"block":"none"}}>
                  <div className="dashboard-card" onClick={()=>setSelectOwner("owner")}><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/person-male.png" alt="person-male"/>Every Owner</div>
                  <div className="dashboard-card"onClick={()=>setSelectOwner("shared")}><img width="30" height="30" src="https://img.icons8.com/ios/50/share--v1.png" alt="share--v1"/>Shared With You</div>
                </div>
                </div>
                <div  className="dashboard-edit-container-button" onMouseUp={()=>{setSelectedMenu2("date-modified")}}>{selectDateModified=="All Time"?"Date Modified":selectDateModified}<img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/chevron-down.png" alt="chevron-down"/>
                <div className="dashboard-menucard" style={{left:"34%",display:selectedMenu2=="date-modified"?"block":"none"}}>

<div style={{width:"90%",height:"7vh",margin:"auto",padding:"0 1vh",display:"flex",alignItems:"center",borderBottom:"1px solid black"}}>Date Modified</div>
{dateModified.map((data,index)=>{
return(
  <div className="dashboard-card" onClick={()=>setSelectDateModified(data)}><span>{data}</span></div>
)
})}



                </div>
                </div>
                <div  className="dashboard-edit-container-button" onMouseUp={()=>setSelectedMenu2("relevant")}>Most Relevant <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/chevron-down.png" alt="chevron-down"/></div>
                <div className="dashboard-menucard" style={{left:"48%",display:selectedMenu2=="relevant"?"block":"none"}}></div>
                </span>
                <span>
                <div  className="dashboard-edit-container-button" style={{background:"#39b339",color:"white",border:"1px solid #39b359"}}>Create
                <img width="30" height="30" src="https://img.icons8.com/ios/50/add--v1.png" alt="add--v1"/>                     </div>
                </span>
            </div>
            <div className="w h-5"></div>
          </div>
        </div>
      </div>
    </>
  );
}
