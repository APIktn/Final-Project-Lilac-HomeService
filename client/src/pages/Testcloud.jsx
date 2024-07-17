import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
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
    setMessage('');

    const data = new FormData();
    data.append('file', file);
    data.append('title', title);

    try {
      // Upload file to Cloudinary
      const cloudinaryResponse = await axios.post('http://localhost:4005/test/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          console.log(e.loaded / e.total);
        },
      });

      // Handle Cloudinary response
      console.log('Cloudinary response:', cloudinaryResponse.data);

      // Prepare data for Supabase
      const photoData = {
        public_id: cloudinaryResponse.data.public_id,
        version: cloudinaryResponse.data.version,
     signature: cloudinaryResponse.data.signature,
        title: title, // Include title from state
        url: cloudinaryResponse.data.secure_url, // Assuming this is the Cloudinary URL
      };

      // Send data to Supabase
      const supabaseResponse = await axios.post('http://localhost:4005/test/create', photoData, {
        headers: { 'Content-Type': 'application/json' },
        
      });

      console.log('Supabase response:', supabaseResponse.data);

      setMessage('Upload successful!');
      setFile(null);
      setTitle('');
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
      <input
        type="title"
        id="title-field"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title"
      />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UploadForm;
