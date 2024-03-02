import React, { useState } from 'react';
import Draggable from 'react-draggable';

const ImageBanner = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textFields, setTextFields] = useState([
        { id: 1, x: 300, y: 100, text: 'Text 1' },
        { id: 2, x: 300, y: 80, text: 'Text 2' },
        { id: 3, x: 300, y: 60, text: 'Text 3' },
        { id: 4, x: 300, y: 120, text: 'Text 4' },

    ]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };

    const handleTextFieldChange = (event, index) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index].text = event.target.value;
        setTextFields(updatedTextFields);
    };

    return (
        <div className="flex flex-col items-center relative">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageInput"
            />
            <label
                htmlFor="imageInput"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Select Image
            </label>
            {selectedImage && (

                <div
                    className="mt-4 w-full h-40 md:h-48 lg:h-64 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: 'contain', // or '100%'
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {textFields.map((textField, index) => (
                        <Draggable
                            key={textField.id}
                            defaultPosition={{ x: textField.x, y: textField.y }}
                            onStop={(e, data) => {
                                const updatedTextFields = [...textFields];
                                updatedTextFields[index].x = data.x;
                                updatedTextFields[index].y = data.y;
                                setTextFields(updatedTextFields);
                            }}
                        >
                            <input
                                type="text"
                                value={textField.text}
                                onChange={(e) => handleTextFieldChange(e, index)}
                                className="absolute border border-gray-400 bg-transparent text-black p-2"
                                style={{ left: textField.x, top: textField.y }}
                            />
                        </Draggable>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageBanner;