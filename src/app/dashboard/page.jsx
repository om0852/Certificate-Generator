"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import dashboardItems, { dateModified, ownership, soryByOptions } from "./menuoptions";
import { useRouter } from "next/navigation";
import CertificateTemplateCard2 from "../component/card/CertificateTemplateCard2";
export default function Page() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("Project");
  const [selectedMenu2, setSelectedMenu2] = useState("");
  const [selectOwner, setSelectOwner] = useState("Every");
  const [selectDateModified, setSelectDateModified] = useState("Today");
  const [selectSortOption, setSelectSortOption] = useState("Newest Edited");
  const [projectData,setProjectData]=useState([]);


  const handleCertificateTemplate=async()=>{
    console.log("run")
    const res = await fetch(`http://localhost:3000/api/certificatetemplate/fetch`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body:JSON.stringify({id:"om",templateGroup:true})
    });
    const response= await res.json();
    setProjectData(response.data)
  }
  useEffect(() => {
    handleCertificateTemplate()
  }, [])
  useEffect(()=>{
    console.log(projectData)

  },[projectData])
  return (
    <>
      <div className="w h flex">
        <div
          className="w-4 h"
          style={{
            background: "#f9f9f9",
          }}
        >
          <div
            className="dashboard-container"
            onMouseDown={() => {
              if (selectedMenu2 != "") setSelectedMenu2("");
            }}
          >
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
        <div className="w" style={{ background: "white",overflow:"hidden" }}>
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
                <div
                  className="dashboard-edit-container-button"
                  onMouseUp={() => setSelectedMenu2("owner")}
                >
                  {selectOwner}{" "}
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios-glyphs/30/chevron-down.png"
                    alt="chevron-down"
                  />
                  <div
                    className="dashboard-menucard"
                    style={{
                      display: selectedMenu2 == "owner" ? "block" : "none",
                    }}
                  >
                  <div
                      style={{
                        width: "90%",
                        height: "7vh",
                        margin: "auto",
                        padding: "0 1vh",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Ownership
                    </div>
                    {ownership.map((data, index) => {
                      return (
                        <div
                        className="dashboard-card dashboard-card-span"
                        style={{  backgroundColor:data==selectOwner? "rgb(0 0 0 / 0.1)"
                        :""}}
                        
                          onClick={() =>{ setSelectOwner(data);
                            setSelectedMenu2("");
                          }}
                        >
                          <span>{data}</span>
                        </div>
                      );
                    })}
                 
                  </div>
                </div>
                <div
                  className="dashboard-edit-container-button"
                  onMouseUp={() => {
                    setSelectedMenu2("date-modified");
                  }}
                >
                  {selectDateModified}
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios-glyphs/30/chevron-down.png"
                    alt="chevron-down"
                  />
                  <div
                    className="dashboard-menucard"
                    style={{
                      left: "34%",
                      display:
                        selectedMenu2 == "date-modified" ? "block" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        height: "7vh",
                        margin: "auto",
                        padding: "0 1vh",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid black",
                      }}
                    >
                      Date Modified
                    </div>
                    {dateModified.map((data, index) => {
                      return (
                        <div
                        className="dashboard-card dashboard-card-span"
                        style={{  backgroundColor:data==selectDateModified? "rgb(0 0 0 / 0.1)"
                        :""}}
                        
                          onClick={() =>{ setSelectDateModified(data);
                          setSelectedMenu2("");
                        }}>
                          <span>{data}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="dashboard-edit-container-button"
                  onMouseUp={() => setSelectedMenu2("relevant")}
                >
{selectSortOption}        
<img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios-glyphs/30/chevron-down.png"
                    alt="chevron-down"
                  />

                </div>
                <div
                  className="dashboard-menucard"
                  style={{
                    left: "48%",
                    height:"50vh",
                    display: selectedMenu2 == "relevant" ? "block" : "none",
                  }}
                >
                    <div
                      style={{
                        width: "90%",
                        height: "7vh",
                        margin: "auto",
                        padding: "0 1vh",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid black",
                      }}
                    >
Sort By
            </div>
                    {soryByOptions.map((data, index) => {
                      // console.log(data,soryByOptions)
                      return (
                        <div
                        style={{  backgroundColor:data==selectSortOption? "rgb(0 0 0 / 0.1)"
                          :""}}
                          className="dashboard-card dashboard-card-span" 
                          onClick={() =>{ setSelectSortOption(data);                            setSelectedMenu2("");
                          }
}                        >
                          <span >{data}</span>
                        </div>
                      );
                    })}
                  
                </div>
              </span>
              <span>
                <div
                  className="dashboard-edit-container-button"
                  style={{
                    background: "#39b339",
                    color: "white",
                    border: "1px solid #39b359",
                  }}
                >
                  Create
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/ios/50/add--v1.png"
                    alt="add--v1"
                  />{" "}
                </div>
              </span>
            </div>
            <div className="w h-5">
              <div style={{fontSize:"2em",fontWeight:"500"}}>Recent Designs</div>
              <div style={{width:"100%",scrollbarWidth:"none",height:"45%",overflowY:"hidden",display:"flex",alignItems:"center",overflowX:"scroll"}}>

                {projectData && projectData.map((data,index)=>{
                  return(
<div style={{textAlign:"center"}}>
                    <CertificateTemplateCard2 
                    key={index}
                    textFields={data.certificateComponentData}
                    backgroundImg={data.backgroundImg}
                    />
                    {data.certificateName}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
