export default function CertificateTemplateCard({textFields,backgroundImg,setTextFields}){
    const handleSetData=()=>{
        setTextFields(textFields)
    }
    return(
        <div
        className="flex flex-col items-center relative"
        style={{
          width: "100%",
        }}
      >
          <div
            style={{
              overflow: "hidden",
              position: "relative",
              scale: .9,
            }}
          >
            <div
             onClick={handleSetData}
            >
              <img
                src={backgroundImg}
              />
  
              {textFields.map((data, index) => {
                {
                  if (data.type == "textfield") {
                    // console.log(data.x, data.y)
                    return (
                      <>
                            <div
                              style={{
                                width: data.width + "px",
                                height: data.height + "px",
                                left: data.x,
                                top: data.y,
                                textAlign: data.alignment,
                                position: "absolute",
                                border: "none",
                                    }}
                                          >
                            
                              <span
                                id="resize-component"
                                type="text"
                                value={data.text}
                                className="absolute border border-gray-400 bg-transparent text-black "
                                style={{
                                  width: data.width + "px",
                                  height: data.height + "px",
                                  textAlign: data.alignment,
                                  overflow: "hidden",
                                  fontFamily: data.fontFamily,
                                  fontSize: parseInt(data.size),
                                  fontWeight: data.bold,
                                  textDecoration: data.underline,
                                  fontStyle: data.italic,
                                  textTransform: data.textOrientation,
                                  color: data.textColor,
  
                                  // border: imageBorder == index && data.isLocked==false ? "1px solid blue" : "none",
                                  zIndex: data.z_index,
                                  boxSizing: "content-box",
                                  padding: "3px",
                                  border: "none",
                                  outline: "none",
                                  opacity: data.transparency / 100,
                                  lineHeight: data.lineHeight + "px",
                                  letterSpacing: data.letterSpacing + "px",
                                }}
                              >{data.text}</span>
                            </div>
                            </>
                            
                            )
                  } else  {
                    return (
                      <>
                          <div
                            key={index}
                            id="resize-component"
                            style={{
                              zIndex: data.z_index,
                              width: data.width + "px",
                              height: data.height + "px",
                              overflow: "visible",
                              opacity: data.transparency / 100,
                              position: "absolute",
                              top: data.y + "px",
                              left: data.x + "px",
                            }}
                          ></div>
                          </>
                            );
                  }
                                }
              })}
            </div>
          </div>
      </div>
  
    )
}