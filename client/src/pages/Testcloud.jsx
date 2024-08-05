import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
 
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
   

    const data = new FormData();
    data.append('file', file);
    
    try {
      // Upload file to Cloudinary
      const cloudinaryResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/test/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          console.log(e.loaded / e.total);
        },
      });

      // Handle Cloudinary response
      console.log('Cloudinary response:', cloudinaryResponse.data);

      // Prepare data for Supabase
      const photoData = {
        upload_image: cloudinaryResponse.data.secure_url, // Assuming this is the Cloudinary URL
      };

      // Send data to Supabase
      const supabaseResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/test/createdprofile`, photoData, {
        headers: { 'Content-Type': 'application/json' },
        
      });

      console.log('Supabase response:', supabaseResponse.data);

      setMessage('Upload successful!');
      setFile(null);
     
    } catch (error) {
      console.error('Error uploading to the backend server', error);
      setMessage('Error uploading. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form id="upload-form" onSubmit={handleSubmit}>
      <input
        type="file"
        id="file-field"
        onChange={handleFileChange}
      />
      {/* <input
        type="title"
        id="title-field"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title"
      /> */}
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UploadForm;
