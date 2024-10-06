"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "./TransitionLink";

const images = [
  {
    src: "https://wallpapers.com/images/hd/purple-sky-3d-nature-9zgqmz91pcm7idf7.jpg",
    title: "Showcase site | Branding",
    caption: "AMGPRO",
  },
  {
    src: "https://i.pinimg.com/originals/13/3b/89/133b89168deaceb619421cd65fc62f59.jpg",
    title: "Ecommerce site | Branding",
    caption: "Diamonds Story",
  },
  {
    src: "https://e1.pxfuel.com/desktop-wallpaper/859/280/desktop-wallpaper-awesome-3d-nature-full-screen-3d-full-screen.jpg",
    title: "Ecommerce site | Branding",
    caption: "Diamonds Story",
  },
  {
    src: "https://cdn.wallpapersafari.com/64/26/m4ojCw.jpg",
    title: "Ecommerce site | Branding",
    caption: "Diamonds Story",
  },
];

const HorizontalScrollMobile: React.FC = () => {
  const router = useRouter(); // Initialize router from Next.js
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Create infinite images by repeating the original array
  const infiniteImages = [...images, ...images, ...images];

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollRef.current) {
        event.preventDefault();
        scrollRef.current.scrollLeft += event.deltaY;
      }
    };

    const handleScroll = () => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const imageWidth = container.offsetWidth / 3; // Adjust for 3 images visible

        // Scroll reset logic for infinite scrolling
        if (container.scrollLeft < imageWidth) {
          container.scrollLeft = container.scrollWidth / 3;
        } else if (container.scrollLeft > (container.scrollWidth * 2) / 3) {
          container.scrollLeft = container.scrollWidth / 3;
        }
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("wheel", handleWheel);
      scrollElement.addEventListener("scroll", handleScroll);

      // Initialize scroll position to the middle of the repeated images
      const initialScrollPosition = scrollElement.scrollWidth / 3;
      scrollElement.scrollLeft = initialScrollPosition;
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("wheel", handleWheel);
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleImageClick = (index: number) => {
    if (expandedIndex === null) {
      setExpandedIndex(index);
      localStorage.setItem("selectedImageId", (index % images.length).toString()); // Store the selected image ID in localStorage
    }
  };

  const handleOverlayClick = () => {
    setExpandedIndex(null);
  };

  return (
    <div className="relative flex pt-[200px] py-3 overflow-hidden">
      <AnimatePresence>
        {expandedIndex !== null && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleOverlayClick}
            />
            {/* Expanded Image */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={infiniteImages[expandedIndex].src}
                alt={infiniteImages[expandedIndex].caption}
                className="w-full h-full object-cover"
                onClick={(e) => e.stopPropagation()}
              />
              <motion.div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white mb-12 z-[101] text-3xl font-bold">
                  {infiniteImages[expandedIndex].title}
                </p>
                <button
                  className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-75 rounded-full p-2"
                  onClick={handleOverlayClick}
                >
                  x
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap cursor-pointer no-scrollbar"
        style={{ maxWidth: "100vw" }}
      >
        <div className="inline-flex items-center gap-4 justify-center">
          {infiniteImages.map((image, index) => {
            return (
              <motion.div
                key={index}
                className={clsx(
                  "inline-block min-w-[calc(100vw)] sm:min-w-[400px] relative transition-transform duration-300"
                )}
                style={{
                  width: "calc(100vw / 3.2)",
                  maxHeight: "500px",
                  height: "500px",
                  minHeight: "500px",
                  overflow: "hidden",
                }}
              >
                <TransitionLink href="/projects/project">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="h-[350px] min-w-[600px] object-cover shadow-md"
                    style={{ minWidth: "600px" }}
                    onClick={() =>
                      expandedIndex === null && handleImageClick(index)
                    }
                  />
                </TransitionLink>
                <div className="flex justify-between mt-2 relative z-10">
                  <p className="text-md sm:text-xl font-bold">{image.title}</p>
                  <p className="text-md sm:text-lg text-gray-400">
                    {image.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default HorizontalScrollMobile;
