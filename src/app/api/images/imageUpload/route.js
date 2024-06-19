import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
try{

// Define a schema for the images collection
const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    size: Number
  });
  
  const Image = mongoose.model('Image', imageSchema);
  
  // Multer configuration for file upload
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'shape'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // POST route for image upload
    try {
      // Save image metadata to MongoDB
      const image = new Image({
        filename: req.file.originalname,
        path: req.file.path,
        size: req.file.size
      });
      await image.save();
  
      res.status(200).json({ message: 'Image uploaded successfully', image });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }

}
catch(Error){

}
}