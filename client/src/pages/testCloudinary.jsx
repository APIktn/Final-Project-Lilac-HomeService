import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
    const preset_key = "image_service";
    const cloud_name = "dxzc7rjrq";
    const [imageFile, setImageFile] = useState(null);

    
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const fromData = new FormData();
        fromData.append('file',file);
        fromData.append('upload_preset',preset_key);
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload,fromData`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
        };

    

    return (
        <div>
            <input
                type="file"
                name="image"
                onChange={handleFileUpload}
            />
            {/* <button onClick={handleFileUpload}>
                Upload
            </button> */}
            {/* Optionally show a preview of the selected image */}
            {imageFile && (
                <div>
                    <h2>Preview</h2>
                    <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
}

export default Upload;
