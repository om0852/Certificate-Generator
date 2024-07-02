"use client";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import dashboardItems, {
  dateModified,
  ownership,
  projectTemplateOption,
  soryByOptions,
  tabgroup1,
} from "./menuoptions";
import { useRouter } from "next/navigation";
import CertificateTemplateCard2 from "../component/card/CertificateTemplateCard2";
import { data } from "autoprefixer";
export default function Page() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState("Project");
  const [selectedMenu2, setSelectedMenu2] = useState(null);
  const [selectedMenu3, setSelectedMenu3] = useState(null);
  const [selectOwner, setSelectOwner] = useState("Every");
  const [downloadState, setDownloadState] = useState(false);
  const [folderState, setFolderState] = useState(false);
  const [selectDateModified, setSelectDateModified] = useState("Today");
  const [selectSortOption, setSelectSortOption] = useState("Newest Edited");
  const [projectData, setProjectData] = useState([]);
  const [folderData, setFolderData] = useState(null);
  const [tabGroup1, setTabGroup1] = useState("All");
  const [folderSectionState, setFolderSectionState] = useState(true);
  const [recentDesignState, setRecentDesignState] = useState(true);
  const [designSectionState, setDesignSectionState] = useState(true);
  const menu3Ref = useRef([]);
  const certificateRef = useRef([]);
  const handlePrint1 = () => {
    var opt = {
      margin: [0, 0, 0, 2], // Array for top, right, bottom, and left margins
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      jsPDF: { unit: "mm", format: [674, 464], orientation: "landscape" },
    };

    setDownloadState(false);
    // New Promise-based usage:
    html2pdf().from(certificateRef.current[selectedMenu3]).set(opt).save();
  };
  const handlePrint2 = useReactToPrint({
    content: () => certificateRef.current[selectedMenu3],
    documentTitle: "done",
    onAfterPrint: () => {
      console.log("printing done");
    },

    removeAfterPrint: true,
  });

  const handleCertificateTemplateOption = async (data, index) => {
    setDownloadState(false);
    if (data == "Open in a new tab") {
      const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}customizetemplate?id=${projectData[index].certificateName}`;

      window.open(url, "_blank", "noopener,noreferrer");
    } else if (data == "Duplicate") {
      const res1 = await fetch(
        `http://localhost:3000/api/addCertificateTemplate`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "om",
            backgroundImage: projectData[index].backgroundImg,
            certificateName: projectData[index].certificateName + "_duplicate",
            certificateComponentData:
              projectData[index].certificateComponentData,
          }),
        }
      );
      const response = await res1.json();
      if (response.status == 404) {
        toast.error(response.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Project Duplicate Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const updatedata = [...projectData];
        updatedata.push(projectData[index]);
        updatedata[updatedata.length - 1].certificateName =
          updatedata[index].certificateName + "_duplicate";
        setProjectData(updatedata);
      }
    } else if (data == "Delete") {
      const res1 = await fetch(
        `http://localhost:3000/api/certificatetemplate/delete`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "om",
            certificateName: projectData[index].certificateName,
          }),
        }
      );
      const response = await res1.json();
      if (response.status == 404) {
        toast.error(response.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Project Delete Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const updatedata = [...projectData];
        updatedata.splice(index, 1);
        setProjectData(updatedata);
      }
    } else if (data == "Download") {
      setDownloadState(true);
    } else if (data == "Move to folder") {
      fetchFolderData();
      setFolderState(true);
    } else {
    }
  };
  const addProjectInFolder = async (id) => {
    const res1 = await fetch(`http://localhost:3000/api/dashboard/folder/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        certificateId: projectData[selectedMenu3]._id,
      }),
    });
    const response = await res1.json();
    if (response.status == 404) {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success(response.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSelectedMenu3(null);
      setFolderState(false);
    }
  };
  const fetchFolderData = async () => {
    const res1 = await fetch(
      `http://localhost:3000/api/dashboard/folder/fetchFolder`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "om" }),
      }
    );
    const response = await res1.json();
    if (response.status == 404) {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setFolderData(response.data);
      console.log(response.data);
    }
  };
  useEffect(() => {
    const handler = (e) => {
      // console.log(selectedMenu3);
      if (selectedMenu3 != null) {
        if (!menu3Ref.current[selectedMenu3].contains(e.target)) {
          setSelectedMenu3(null);
          setDownloadState(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [selectedMenu3]);
  useEffect(() => {
    fetchFolderData();
  }, []);
  const handleCertificateTemplate = async () => {
    console.log("run");
    const res = await fetch(
      `http://localhost:3000/api/certificatetemplate/fetch`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "om", templateGroup: true }),
      }
    );
    const response = await res.json();
    setProjectData(response.data);
    if (menu3Ref.current.length !== response.data.length) {
      menu3Ref.current = Array(response.data.length)
        .fill()
        .map((_, i) => menu3Ref.current[i] || React.createRef());
    }
  };
  useEffect(() => {
    handleCertificateTemplate();
  }, []);
  useEffect(() => {
    // console.log(projectData)
  }, [projectData]);
  return (
    <>
      <div className="w h flex">
        <ToastContainer />
        <div
          className="w-4 h sidebar-background"
          style={{
            color: "white",
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
                src="https://img.icons8.com/material/24/FFFFFF/dashboard-layout.png"
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
                      src="https://img.icons8.com/material-sharp/24/FFFFFF/sort-right.png"
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
                      src="https://img.icons8.com/material-sharp/24/FFFFFF/sort-right.png"
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
        <div className="w" style={{ background: "white", overflow: "hidden" }}>
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
                    src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chevron-down.png"
                    alt="chevron-down"
                  />
                  <div
                    className="dashboard-menucard"
                    style={{
                      display: selectedMenu2 == "owner" ? "block" : "none",
                      background: "white",
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
                          key={index}
                          className="dashboard-card dashboard-card-span"
                          style={{
                            backgroundColor:
                              data == selectOwner ? "rgb(0 0 0 / 0.1)" : "",
                          }}
                          onClick={() => {
                            setSelectOwner(data);
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
                      background: "white",
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
                          key={index}
                          className="dashboard-card dashboard-card-span"
                          style={{
                            backgroundColor:
                              data == selectDateModified
                                ? "rgb(0 0 0 / 0.1)"
                                : "",
                          }}
                          onClick={() => {
                            setSelectDateModified(data);
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
                    height: "50vh",
                    background: "white",
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
                        key={index}
                        style={{
                          backgroundColor:
                            data == selectSortOption ? "rgb(0 0 0 / 0.1)" : "",
                        }}
                        className="dashboard-card dashboard-card-span"
                        onClick={() => {
                          setSelectSortOption(data);
                          setSelectedMenu2("");
                        }}
                      >
                        <span>{data}</span>
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
            <div
              className="w h-5"
              style={{ overflowY: "scroll", scrollbarWidth: "none" }}
            >
              <div className="flex tab-group">
                {tabgroup1.map((data, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setTabGroup1(data)}
                      style={{ display: "grid", placeItems: "center" }}
                    >
                      <div>{data}</div>
                      <div
                        style={{
                          width: data == tabGroup1 ? "70px" : "0px",
                          height: "2px",
                          background: "black",
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
              {/* recent degign  */}
              {(tabGroup1=="All" || tabGroup1=="Recent Designs")  &&
              <div>
                <div
                  onClick={() => {
                    setRecentDesignState((prev) => !prev);
                  }}
                  style={{
                    transition: "all .3s ease-in",
                    height: "9vh",
                    display: "flex",
                    padding: "0 2vh",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      rotate: recentDesignState == true ? "90deg" : "0deg",
                    }}
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material-outlined/24/forward.png"
                    alt="forward"
                  />
                  <span style={{ fontSize: "2em" }}>Recent Deigns</span>
                </div>

                {recentDesignState && (
                  <div
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      height: "45vh",
                    }}
                  >
                    <div
                      style={{
                        height: "45vh",
                        width: "100%",
                        scrollbarWidth: "none",
                        overflowY: "hidden",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {projectData &&
                        projectData.map((data, index) => {
                          return (
                            <div
                              style={{
                                textAlign: "center",
                                height: "33vh",
                                wordWrap: "break-word",
                                width: "50vh",
                              }}
                              key={index}
                            >
                              <CertificateTemplateCard2
                                index={index}
                                textFields={data.certificateComponentData}
                                backgroundImg={data.backgroundImg}
                                certificateRef={certificateRef}
                              />
                              {data.certificateName}
                              <div
                                ref={(el) => (menu3Ref.current[index] = el)}
                                style={{
                                  display: "grid",
                                  placeItems: "center",
                                  width: "40px",
                                  height: "40px",
                                  position: "relative",
                                  top: "-32vh",
                                  left: "36.5vh",
                                  cursor: "pointer",
                                }}
                              >
                                <img
                                  onClick={() => {
                                    setSelectedMenu3(index);
                                  }}
                                  width="30"
                                  height="30"
                                  src="https://img.icons8.com/ios-glyphs/30/menu-2.png"
                                  alt="menu-2"
                                />
                                {index == selectedMenu3 && (
                                  <div
                                    style={{
                                      width: "40vh",
                                      height: "auto",
                                      top: "8%",
                                      left: "50%",
                                      borderRadius: "1vh",
                                      boxShadow:
                                        "rgba(64, 87, 109, 0.07) 0px 0px 0px 1px, rgba(53, 71, 90, 0.2) 0px 2px 12px",
                                      position: "fixed",
                                      background: "white",
                                      zIndex: 300,
                                    }}
                                  >
                                    {projectTemplateOption.map(
                                      (data, index2) => {
                                        return (
                                          <div
                                            onClick={() =>
                                              handleCertificateTemplateOption(
                                                data.text,
                                                index
                                              )
                                            }
                                            className="dashboard-card dashboard-card-span"
                                            key={index}
                                          >
                                            <span
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-around",
                                              }}
                                            >
                                              <img
                                                width="20"
                                                height="20"
                                                src={data.img}
                                                alt="add--v1"
                                              />
                                              {data.text}
                                            </span>
                                            {data.text == "Move to folder" &&
                                              folderState && (
                                                <div
                                                  className="bx-shadow"
                                                  style={{
                                                    width: "35vh",
                                                    position: "absolute",
                                                    left: "30vh",
                                                    height: "auto",
                                                    background: "white",
                                                    borderRadius: "1.4vh",
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
                                                      borderBottom:
                                                        "1px solid black",
                                                    }}
                                                  >
                                                    Folders
                                                  </div>
                                                  <div
                                                    className="dashboard-edit-container-button"
                                                    style={{
                                                      margin: "1vh auto",
                                                      width: "90%",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      background: "#39b339",
                                                      color: "white",
                                                      border:
                                                        "1px solid #39b359",
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

                                                  {folderData &&
                                                    folderData.map(
                                                      (data, index) => {
                                                        return (
                                                          <div
                                                            onClick={() =>
                                                              addProjectInFolder(
                                                                data._id
                                                              )
                                                            }
                                                            className="dashboard-card dashboard-card-span"
                                                            key={index}
                                                          >
                                                            <span
                                                              style={{
                                                                display: "flex",
                                                                alignItems:
                                                                  "center",
                                                                justifyContent:
                                                                  "space-around",
                                                              }}
                                                            >
                                                              {data.folderName}
                                                            </span>
                                                          </div>
                                                        );
                                                      }
                                                    )}
                                                </div>
                                              )}
                                            {data.text == "Download" &&
                                              downloadState && (
                                                <div
                                                  className="bx-shadow"
                                                  style={{
                                                    width: "35vh",
                                                    position: "absolute",
                                                    left: "30vh",
                                                    height: "auto",
                                                    background: "white",
                                                    borderRadius: "1.4vh",
                                                  }}
                                                >
                                                  <button
                                                    onClick={() => {
                                                      handlePrint2();
                                                      setDownloadState(false);
                                                    }}
                                                    type="button"
                                                    style={{
                                                      width: "90%",
                                                      margin: "1vh auto",
                                                    }}
                                                    className=" download-btn px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform  flex"
                                                  >
                                                    <img
                                                      width="30"
                                                      height="30"
                                                      src="https://img.icons8.com/ios/50/print--v1.png"
                                                      alt="print--v1"
                                                    />
                                                    <span class="ml-2">
                                                      Print
                                                    </span>
                                                  </button>
                                                  <button
                                                    style={{
                                                      width: "90%",
                                                      margin: "1vh auto",
                                                    }}
                                                    onClick={handlePrint1}
                                                    type="button"
                                                    className=" download-btn text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2 px-4 py-3"
                                                  >
                                                    <img
                                                      width="30"
                                                      height="30"
                                                      src="https://img.icons8.com/ios/50/pdf--v1.png"
                                                      alt="pdf--v1"
                                                    />
                                                    Download As PDF
                                                  </button>
                                                </div>
                                              )}{" "}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}{" "}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>}
              {/* folder section */}
              {(tabGroup1=="All" || tabGroup1=="Folder")  &&
  <div style={{paddingBottom: folderSectionState==true?"15vh":"0vh"}}>
                <div
                  onClick={() => {
                    setFolderSectionState((prev) => !prev);
                  }}
                  style={{
                    transition: "all .3s ease-in",
                    height: "9vh",
                    display: "flex",
                    padding: "0 2vh",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      rotate: folderSectionState == true ? "90deg" : "0deg",
                    }}
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material-outlined/24/forward.png"
                    alt="forward"
                  />
                  <span style={{ fontSize: "2em" }}>Folders</span>
                </div>
                {folderSectionState && (
                  <div>
                    {folderData &&
                      folderData.map((data) => {
                        return (
                          <div
                            style={{
                              width: "20vh",
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            <img
                              width="60"
                              height="60"
                              src="https://img.icons8.com/color/48/folder-invoices--v1.png"
                              alt="folder-invoices--v1"
                            />{" "}
                            {data.folderName}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>}
              {/* desgin section */}
              {(tabGroup1=="All" || tabGroup1=="Design")  &&
   <div style={{paddingBottom: designSectionState==true?"15vh":"0vh"}}>
                <div
                  onClick={() => {
                    setDesignSectionState((prev) => !prev);
                  }}
                  style={{
                    transition: "all .3s ease-in",
                    height: "9vh",
                    display: "flex",
                    padding: "0 2vh",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      rotate: designSectionState == true ? "90deg" : "0deg",
                    }}
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material-outlined/24/forward.png"
                    alt="forward"
                  />
                  <span style={{ fontSize: "2em" }}>Designs</span>
                </div>
                {designSectionState && (
                  <div style={{display:"grid",gridTemplateColumns:"auto auto auto"}}>
                    {projectData &&
                      projectData.map((data, index) => {
                        return (
                          <div
                            style={{

display:"grid",
placeItems:"center",
                              height: "33vh",
                              wordWrap: "break-word",
                              width: "50vh",
                              margin:"2vh 0"
                            }}
                            key={index}
                          >
                            <CertificateTemplateCard2
                              index={index}
                              textFields={data.certificateComponentData}
                              backgroundImg={data.backgroundImg}
                              certificateRef={certificateRef}
                            />
                            {data.certificateName}
                            <div
                              ref={(el) => (menu3Ref.current[index] = el)}
                              style={{
                                display: "grid",
                                placeItems: "center",
                                width: "40px",
                                height: "40px",
                                position: "relative",
                                top: "-32vh",
                                left: "18vh",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                onClick={() => {
                                  setSelectedMenu3(index);
                                }}
                                width="30"
                                height="30"
                                src="https://img.icons8.com/ios-glyphs/30/menu-2.png"
                                alt="menu-2"
                              />
                              {index == selectedMenu3 && (
                                <div
                                  style={{
                                    width: "40vh",
                                    height: "auto",
                                    top: "8%",
                                    left: "50%",
                                    borderRadius: "1vh",
                                    boxShadow:
                                      "rgba(64, 87, 109, 0.07) 0px 0px 0px 1px, rgba(53, 71, 90, 0.2) 0px 2px 12px",
                                    position: "fixed",
                                    background: "white",
                                    zIndex: 300,
                                  }}
                                >
                                  {projectTemplateOption.map((data, index2) => {
                                    return (
                                      <div
                                        onClick={() =>
                                          handleCertificateTemplateOption(
                                            data.text,
                                            index
                                          )
                                        }
                                        className="dashboard-card dashboard-card-span"
                                        key={index}
                                      >
                                        <span
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-around",
                                          }}
                                        >
                                          <img
                                            width="20"
                                            height="20"
                                            src={data.img}
                                            alt="add--v1"
                                          />
                                          {data.text}
                                        </span>
                                        {data.text == "Move to folder" &&
                                          folderState && (
                                            <div
                                              className="bx-shadow"
                                              style={{
                                                width: "35vh",
                                                position: "absolute",
                                                left: "30vh",
                                                height: "auto",
                                                background: "white",
                                                borderRadius: "1.4vh",
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
                                                  borderBottom:
                                                    "1px solid black",
                                                }}
                                              >
                                                Folders
                                              </div>
                                              <div
                                                className="dashboard-edit-container-button"
                                                style={{
                                                  margin: "1vh auto",
                                                  width: "90%",
                                                  display: "flex",
                                                  justifyContent: "center",
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

                                              {folderData &&
                                                folderData.map(
                                                  (data, index) => {
                                                    return (
                                                      <div
                                                        onClick={() =>
                                                          addProjectInFolder(
                                                            data._id
                                                          )
                                                        }
                                                        className="dashboard-card dashboard-card-span"
                                                        key={index}
                                                      >
                                                        <span
                                                          style={{
                                                            display: "flex",
                                                            alignItems:
                                                              "center",
                                                            justifyContent:
                                                              "space-around",
                                                          }}
                                                        >
                                                          {data.folderName}
                                                        </span>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                            </div>
                                          )}
                                        {data.text == "Download" &&
                                          downloadState && (
                                            <div
                                              className="bx-shadow"
                                              style={{
                                                width: "35vh",
                                                position: "absolute",
                                                left: "30vh",
                                                height: "auto",
                                                background: "white",
                                                borderRadius: "1.4vh",
                                              }}
                                            >
                                              <button
                                                onClick={() => {
                                                  handlePrint2();
                                                  setDownloadState(false);
                                                }}
                                                type="button"
                                                style={{
                                                  width: "90%",
                                                  margin: "1vh auto",
                                                }}
                                                className=" download-btn px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform  flex"
                                              >
                                                <img
                                                  width="30"
                                                  height="30"
                                                  src="https://img.icons8.com/ios/50/print--v1.png"
                                                  alt="print--v1"
                                                />
                                                <span class="ml-2">Print</span>
                                              </button>
                                              <button
                                                style={{
                                                  width: "90%",
                                                  margin: "1vh auto",
                                                }}
                                                onClick={handlePrint1}
                                                type="button"
                                                className=" download-btn text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2 px-4 py-3"
                                              >
                                                <img
                                                  width="30"
                                                  height="30"
                                                  src="https://img.icons8.com/ios/50/pdf--v1.png"
                                                  alt="pdf--v1"
                                                />
                                                Download As PDF
                                              </button>
                                            </div>
                                          )}{" "}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}{" "}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
