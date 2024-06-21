"use client"
import React, { useRef } from 'react';
import Draggable from 'react-draggable';

export default function CertificateTemplateCard({ textFields, backgroundImg, setTextFields }) {
  const certificateRef = useRef(null);
  const selectedImage = backgroundImg; // Assuming backgroundImg is passed correctly as a prop

  const handleSetData = () => {
    setTextFields(textFields);
  };

  return (
    <div
      className="flex flex-col items-center relative"
      style={{
        width: '100%',
        height: '35%',
      }}
    >
      <div
        style={{
          width: '900px',
          position: 'relative',
          top:"-100%",
          transform: 'scale(0.25)',
          marginTop: '-5vh',
        }}
      >
        <div style={{ zIndex: -1 }}>
          <img onClick={handleSetData} src={selectedImage} style={{ width: '900px', height: '620px' }} alt="Certificate Background" />
          {textFields.map((data, index) => {
            if (data.type === 'textfield') {
              return (
                <Draggable
                  className="draggable"
                  key={index}
                  defaultPosition={{ x: 0, y: 0 }}
                  position={{ x: data.x, y: data.y }}
                >
                  <div
                    key={index}
                    style={{
                      width: data.width + 'px',
                      height: data.height + 'px',
                      left: data.x,
                      top: data.y,
                      textAlign: data.alignment,
                      position: 'absolute',
                      border: 'none',
                    }}
                  >
                  
                    <textarea
                      id="resize-component"
                      type="text"
                      value={data.text}
                      className="absolute border border-gray-400 bg-transparent text-black"
                      style={{
                        width: data.width + 'px',
                        height: data.height + 'px',
                        textAlign: data.alignment,
                        overflow: 'hidden',
                        fontFamily: data.fontFamily,
                        fontSize: parseInt(data.size),
                        fontWeight: data.bold,
                        textDecoration: data.underline,
                        fontStyle: data.italic,
                        textTransform: data.textOrientation,
                        color: data.textColor,
                        zIndex: data.z_index,
                        boxSizing: 'content-box',
                        padding: '3px',
                        border: 'none',
                        outline: 'none',
                        opacity: data.transparency / 100,
                        lineHeight: data.lineHeight + 'px',
                        letterSpacing: data.letterSpacing + 'px',
                      }}
                    />
                  </div>
                </Draggable>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
