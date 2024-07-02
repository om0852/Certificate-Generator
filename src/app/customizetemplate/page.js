"use client"
import FileSelector from "../component/FileSelector";
import React, { useEffect, useRef, useState } from 'react';
import selectImage from "../../images/selectimage.png";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { toPng } from 'html-to-image';
import NewSideBar from "../component/NewSideBar.jsx";
import StylingHeader from "../component/StylingHeader";
import ZoomControlBar from "../component/menu/ZoomControlBar";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    const [selectedTextFieldIndex, setSelectedTextFieldIndex] = useState(0); // State to hold the index of the selected text field
    const [undoHistoryTracker, setUndoHistoryTracker] = useState(-1)
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [imageBorder, setImageBorder] = useState(0);
    const [selectImageLayer, setSelectImageLayer] = useState(0);
    const [zoomValue, setZoomValue] = useState(0.7);
    const [textFields, setTextFields] = useState([
        { id: 1, x: 0, y: 0, text: 'Text 1', fontFamily: "Times New Roman", letterSpacing: 0, lineHeight: 10, size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false },
    ]);
    const [undoHistoryComponent, setUndoHistoryComponent] = useState([[{ id: 1, x: 0, y: 0, text: 'Text 1', letterSpacing: 0, lineHeight: 10, fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false }]])
    const [undoHistoryIndex, setUndoHistoryIndex] = useState([{ x: 0, y: 0 }]);
    const [imageFields, setImageFields] = useState([])
    const certificateRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');

    const [selectedImage, setSelectedImage] = useState(selectImage);
    //red0 variaviable
    const [redoHistoryComponent, setRedoHistoryComponent] = useState([]);
    const [redoHistoryIndex, setRedoHistoryIndex] = useState([]);
    const [redoHistoryIndexTracker, setRedoHistoryIndexTracker] = useState(-1);


    //zoom logic
    const handleZoomControl = (value) => {
        setZoomValue(value);
    }

    //redo feature login
    const handleRedoHistoryComponent = (e) => {

        if (e.ctrlKey && e.key === 'y' && redoHistoryIndexTracker >= 0) {
            console.log("remove call")
            console.log(redoHistoryIndexTracker)

            const updatedata = [...redoHistoryComponent] // Remove last item
            let newArray = updatedata[redoHistoryIndexTracker]
            setTextFields(newArray);
            setSelectedTextFieldIndex(redoHistoryIndex[redoHistoryIndexTracker].x);
            setSelectImageLayer(redoHistoryIndex[redoHistoryIndexTracker].y);
            setImageBorder(redoHistoryIndex[redoHistoryIndexTracker].y)
            const popdata1 = updatedata.pop();
            setRedoHistoryComponent(updatedata);
            const updatedata2 = [...redoHistoryIndex];
            const popdata2 = updatedata2.pop();
            setRedoHistoryIndex(updatedata2);
            setRedoHistoryIndexTracker(prev => prev - 1);

            setUndoHistoryComponent(prev => [...prev, popdata1]);
            setUndoHistoryIndex(prev => [...prev, popdata2]);
            setUndoHistoryTracker(prev => prev + 1);
        }


    }

    //testing code
    // useEffect(() => {
    //     console.log(redoHistoryComponent)
    //     console.log("history index", redoHistoryIndex)
    //     console.log("history index tracker", redoHistoryIndexTracker)
    // }
    //     , [redoHistoryComponent])
    // useEffect(() => {
    //     console.log(undoHistoryComponent)
    //     console.log("history index", undoHistoryIndex)
    //     console.log("history index tracker", undoHistoryTracker)
    // }
    //     , [undoHistoryComponent, undoHistoryTracker])
    //main code


    const handleHistoryComponent = (data1 = null) => {
        console.log("add call");
        console.log(undoHistoryComponent)

        if (undoHistoryComponent.length > 16) {
            console.log("shift call")
            const updatedata = [...undoHistoryComponent];
            updatedata.shift()
            setUndoHistoryComponent(updatedata);
            const updatedata1 = [...undoHistoryIndex];
            updatedata1.shift()
            setUndoHistoryIndex(updatedata1);
        }
        let newX = selectedTextFieldIndex;
        let newY = selectImageLayer
        setUndoHistoryIndex(prev => [
            ...prev, { x: newX, y: newY }
        ])
        if (data1 == null) {

            const updatedata2 = [...undoHistoryComponent];

            updatedata2.push(textFields);
            updatedata2[0] = [{ id: 1, x: 0, y: 0, text: 'Text 1', letterSpacing: 0, lineHeight: 10, fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false }];
            setUndoHistoryComponent(updatedata2);
        }
        else {
            const updatedata2 = [...undoHistoryComponent];

            updatedata2.push(data1);
            updatedata2[0] = [{ id: 1, x: 0, y: 0, letterSpacing: 0, lineHeight: 10, text: 'Text 1', fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false }];
            setUndoHistoryComponent(updatedata2);

        }
        setUndoHistoryTracker(prev => prev + 1);
    }
    useEffect(() => {
        document.addEventListener("keyup", handleUndoComponent);
        document.addEventListener("keyup", handleRedoHistoryComponent);
        return () => {
            document.removeEventListener("keyup", handleUndoComponent);
            document.removeEventListener("keyup", handleRedoHistoryComponent);
        }

    }, [undoHistoryComponent, undoHistoryIndex, undoHistoryTracker, redoHistoryIndexTracker, redoHistoryComponent])

    const handleUndoComponent = (e) => {
        if (e.ctrlKey && e.key === 'z' && undoHistoryTracker >= 0) {
            console.log("remove call")
            console.log(undoHistoryTracker)

            const updatedata = [...undoHistoryComponent] // Remove last item
            updatedata[0] = [{ id: 1, x: 0, y: 0, text: 'Text 1', textColor: "black", letterSpacing: 0, lineHeight: 10, fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false }];
            let newArray = updatedata[undoHistoryTracker]
            setTextFields(newArray);
            setSelectedTextFieldIndex(undoHistoryIndex[undoHistoryTracker].x);
            setSelectImageLayer(undoHistoryIndex[undoHistoryTracker].y);
            setImageBorder(undoHistoryIndex[undoHistoryTracker].y)
            setUndoHistoryTracker(undoHistoryTracker - 1);
            const popdata = updatedata.pop();
            setUndoHistoryComponent(updatedata);
            setRedoHistoryComponent(prev => [...prev, popdata]);
            const updatedata1 = [...undoHistoryIndex];
            const popdata2 = updatedata1.pop();
            setUndoHistoryIndex(updatedata1)
            setRedoHistoryIndex(prev => [...prev, popdata2]);
            setRedoHistoryIndexTracker(prev => prev + 1)
        }
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            console.log(reader)
            reader.onload = () => {
                setSelectedImage(reader.result);
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height, x: 0, y: 0 });
                };
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };
    const fetchCertiifcateData = async () => {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const res1 = await fetch(`http://localhost:3000/api/certificatetemplate/singlefetch`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: "om", certificateName: id }),
        });
        const response = await res1.json();
        if (response.status == 200) {
            setTextFields(response.data.certificateComponentData);
            setSelectedImage(response.data.backgroundImg);
        }

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
            router.push("/choosetemplate")
        }
    }
    useEffect(() => {
        fetchCertiifcateData();
    }, [])
    const addFields = () => {
        addTextField();
    }
    const handleRadioChange = (index) => {
        const updatedTextFields = [...textFields];
        if (updatedTextFields[index].isSelected == false) {
            updatedTextFields[index].isSelected = false;
            updatedTextFields[index].isSelected = true; setTextFields(updatedTextFields)
            setSelectedTextFieldIndex(index);
            setImageBorder(index);
            setSelectImageLayer(index)
        }
    };


    const downloadCertificate = async () => {

        toPng(certificateRef.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'cetificate.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const addTextField = () => {
        const data = { id: (textFields.length + 1), x: 0, y: 0, letterSpacing: 0, lineHeight: 10, text: "Text" + (textFields.length + 1), textColor: "black", fontFamily: "Times New Roman", size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: false, isLocked: false }
        setTextFields(prevTextFields => [
            ...prevTextFields,
            data
        ]);
        const updatedata = [...textFields];
        updatedata.push(data);
        handleHistoryComponent(updatedata);
    }
    const handleTextFieldChange = (event, index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index].text = event.target.value;
        setTextFields(updatedTextFields);
    };
    return (
        <>

            <div onContextMenu={(e) => { e.preventDefault(); }} className="flex" style={{
                width: "100%", height: "100vh", alignItems: "center", overflow: "hidden", scrollbarWidth: "none",
                scrollBehavior: "smooth"
            }}>
                {/* <!-- Sidebar (Optional) --> */}

                <NewSideBar setSelectedImage={setSelectedImage} imageBorder={imageBorder} setImageBorder={setImageBorder} certificateRef={certificateRef} setImageFields={setImageFields} imageFields={imageFields} handleImageChange={handleImageChange} selectedTextFieldIndex={selectedTextFieldIndex} handleRadioChange={handleRadioChange} setTextFields={setTextFields} textFields={textFields} downloadCertificate={downloadCertificate} handleTextFieldChange={handleTextFieldChange} addFields={addFields} handleHistoryComponent={handleHistoryComponent} />
                {/* <Sidebar imageBorder={imageBorder} setImageBorder={setImageBorder} certificateRef={certificateRef} setImageFields={setImageFields} imageFields={imageFields} handleImageChange={handleImageChange} selectedTextFieldIndex={selectedTextFieldIndex} handleRadioChange={handleRadioChange} setTextFields={setTextFields} textFields={textFields} downloadCertificate={downloadCertificate} handleTextFieldChange={handleTextFieldChange} addFields={addFields} handleHistoryComponent={handleHistoryComponent} /> */}
                <div style={{ width: "100%", overflow: "hidden", height: "100%" }}>
                    <StylingHeader imageBorder={imageBorder} setImageBorder={setImageBorder} certificateRef={certificateRef} setImageFields={setImageFields} imageFields={imageFields} handleImageChange={handleImageChange} selectedTextFieldIndex={selectedTextFieldIndex} handleRadioChange={handleRadioChange} setTextFields={setTextFields} textFields={textFields} downloadCertificate={downloadCertificate} handleTextFieldChange={handleTextFieldChange} addFields={addFields} handleHistoryComponent={handleHistoryComponent} />
                    <FileSelector imageBorder={imageBorder} zoomValue={zoomValue} setSelectedTextFieldIndex={setSelectedTextFieldIndex} setImageBorder={setImageBorder} setImageFields={setImageFields} imageFields={imageFields} selectedImage={selectedImage} selectedTextFieldIndex={selectedTextFieldIndex} addFields={addFields} certificateRef={certificateRef} setTextFields={setTextFields} textFields={textFields} handleRadioChange={handleRadioChange} setSelectImageLayer={setSelectImageLayer} handleHistoryComponent={handleHistoryComponent} selectImageLayer={selectImageLayer} undoHistoryComponent={undoHistoryComponent} />
                    <ZoomControlBar handleZoomControl={handleZoomControl} zoomValue={zoomValue} />
                </div>
            </div >

        </>
    );
}
