import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import supabase from '../utils/db.mjs'; // Ensure the correct relative path
import { Router } from 'express';
import cloudinary from '../utils/cloudinary.mjs';


const uploadPreset = 'image_Profile';
const folderName = 'image_Profile';

const uploadsRouter = Router();

const upload = multer({ dest: 'uploads/' });

uploadsRouter.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).send('No file uploaded');
      }
  
      const filePath = path.resolve(file.path);
  
      const data = new FormData();
      data.append('file', fs.createReadStream(filePath));
      data.append('api_key', cloudinary.api_key);
      data.append('upload_preset', uploadPreset);
      data.append('folder', folderName);
      
      const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary.cloud_name}/auto/upload`, data, {
        headers: {
          ...data.getHeaders(),
        },
      });
  
      await fs.promises.unlink(filePath);
  
      res.json(cloudinaryResponse.data);
    } catch (error) {
      console.error('Error uploading to Cloudinary', error);
      res.status(500).send('Error uploading to Cloudinary');
    }
  });

  uploadsRouter.post('/create', async (req, res) => {
    try {
      const { public_id, version, signature, url, title } = req.body;
  
      const { data, error } = await supabase
        .from('images')
        .insert([{ public_id, version, signature, url, title }]);
  
      if (error) {
        throw error;
      }
  
      res.status(201).json({ message: 'Upload successful!', data });
    } catch (error) {
      console.error('Error inserting into Supabase', error);
      res.status(400).json({ error: 'Error registering: ' + error.message });
    }
  });

  uploadsRouter.post('/createdprofile', async (req, res) => {
    try {
      const {upload_image} = req.body;
  
      const { data, error } = await supabase
        .from('users')
        .insert([{ upload_image }]);
  
      if (error) {
        throw error;
      }
  
      res.status(201).json({ message: 'Upload successful!', data });
    } catch (error) {
      console.error('Error inserting into Supabase', error);
      res.status(400).json({ error: 'Error registering: ' + error.message });
    }
  });
  
  
export default uploadsRouter;
