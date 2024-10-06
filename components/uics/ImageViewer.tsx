"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ImageViewerProps {
  images: string[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  const handleCloseClick = () => {
    setSelectedImage(null);
  };

  const renderPhotos = (source: string[]) => {
    return source.map((photo, index) => (
      <div key={index} className="relative group cursor-pointer" onClick={() => handleImageClick(photo)}>
        <img
          src={photo}
          alt={`Image ${index + 1}`}
          className="rounded-lg w-[100px] h-[100px] object-cover mx-1 shadow-sm border"
        />
      </div>
    ));
  };

  return (
    <div className="relative">
      <div className="flex flex-col w-full items-center mb-4">
        <div className="flex w-full border-gray-200 py-2 border-[0.5px] border-solid rounded-md flex-wrap items-center justify-center gap-2">
          {renderPhotos(images)}
        </div>
      </div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <button
            className="absolute top-4 right-4 text-white text-4xlxl font-semibold bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
            onClick={handleCloseClick}
          >
            &times;
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ImageViewer;
