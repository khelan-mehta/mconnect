"use client";

import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { BASE_URL } from "../../app/env";

interface ImageUploaderProps {
  defaultImages?: string[];
  isEditable: boolean;
  onImagesChange: (images: string[]) => void; // Callback to send image URLs to the parent
}

const uploadImage = async (file: File): Promise<string> => {
  // Convert image to base64
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  defaultImages = [],
  isEditable,
  onImagesChange,
}) => {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Ensure we only display a maximum of 2 images at a time
    setImages(defaultImages.slice(0, 2));
  }, [defaultImages]);

  const handleImageUpload = async (event: any) => {
    if (event.target.files) {
      const file = event.target.files[0];
      try {
        const imageUrl = await uploadImage(file);
        const updatedImages = [...images, imageUrl].slice(0, 2); // Limit to 2 images
        setImages(updatedImages);
        console.log("Uploaded image URL:", imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setSelectedImageIndex(null);
  };
  useEffect(() => {
    const handleSave = () => {
      // Notify parent of changes to the image list
      onImagesChange(images);
    };
    handleSave();
  }, [images.length]);

  const renderPhotos = (source: string[]) => {
    return source.map((photo, index) => (
      <div key={index} className="relative group cursor-pointer">
        <img
          src={photo}
          alt="uploaded"
          className="rounded-lg w-[100px] h-[100px] object-cover mx-1 shadow-sm border"
          onClick={() => handleImageClick(index)}
        />
        {isEditable && selectedImageIndex === index && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <Trash
              className="text-white w-6 h-6 cursor-pointer"
              onClick={() => handleDeleteImage(index)}
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col w-full items-center mb-4">
      <div className="flex w-full border-gray-200 py-2 border-[0.5px] border-solid rounded-md flex-wrap items-center justify-center gap-2">
        {renderPhotos(images)}
        {isEditable && images.length < 2 && (
          <label className="cursor-pointer flex items-center justify-center rounded-lg w-[100px] h-[100px] text-3xl text-white">
            <span className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
              +
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>
      {images.length >= 2 && (
        <p className="text-red-500 mt-2 text-sm">
          Maximum of 2 images allowed.
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
