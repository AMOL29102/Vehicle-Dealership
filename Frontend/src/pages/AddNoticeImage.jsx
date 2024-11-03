import React from "react";
import { useState } from "react";
function AddNoticeImage(){

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    
    const handleImageChange = (e) => {
        setImages([...e.target.files]);
      };
    return (
        <>
            <h2 className="text-xl font-bold mb-2">Upload Notice Image </h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />

<div className="flex flex-wrap gap-4 mb-5">
            {images.map((image, index) => {
              const imageURL = URL.createObjectURL(image);
              return (
                <img
                  key={index}
                  src={imageURL}
                  alt={`Preview ${index + 1}`}
                  className="h-32 object-cover rounded-lg shadow-lg"
                />
              );
            })}
          </div>

          <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
        </>

    )
}

export default AddNoticeImage;