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
    key: "0",
  },
  {
    src: "https://i.pinimg.com/originals/13/3b/89/133b89168deaceb619421cd65fc62f59.jpg",
    title: "Ecommerce site | Branding",
    caption: "Diamonds Story",
    key: "1",
  },
  {
    src: "https://e1.pxfuel.com/desktop-wallpaper/859/280/desktop-wallpaper-awesome-3d-nature-full-screen-3d-full-screen.jpg",
    title: "Ecommerce site | Branding",
    caption: "Diamonds Story",
    key: "2",
  },
  {
    src: "https://cdn.wallpapersafari.com/64/26/m4ojCw.jpg",
    title: "Ecommerce site | Branding",
    caption: "Diamonds Story",
    key: "3",
  },
  {
    src: "https://cdn.wallpapersafari.com/64/26/m4ojCw.jpg",
    title: "Ecommerce site | Branding",
    caption: "Diamonds Story",
    key: "4",
  },
  {
    src: "https://cdn.wallpapersafari.com/64/26/m4ojCw.jpg",
    title: "Ecommerce site | Branding",
    caption: "Diamonds Story",
    key: "5",
  },
  // Add more images as needed
];

const HorizontalScroll: React.FC = () => {
  const router = useRouter(); // Initialize router from Next.js
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const infiniteImages = [...images, ...images, ...images];
  const [central, setCentral] = useState<any>(null);
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
        const imageWidth = container.offsetWidth / 3;

        if (container.scrollLeft < imageWidth) {
          container.scrollLeft = container.scrollWidth / 3;
        } else if (container.scrollLeft > (container.scrollWidth * 2) / 3) {
          container.scrollLeft = container.scrollWidth / 3;
        }

        setScrollPosition(container.scrollLeft);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("wheel", handleWheel);
      scrollElement.addEventListener("scroll", handleScroll);

      const initialScrollPosition = scrollElement.scrollWidth / 3;
      scrollElement.scrollLeft = initialScrollPosition;
      setScrollPosition(initialScrollPosition);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("wheel", handleWheel);
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const calculateCentralImageIndex = () => {
    if (!scrollRef.current) return 0;

    const elementWidth = scrollRef.current.offsetWidth / 3;
    const center = scrollPosition + scrollRef.current.offsetWidth / 2;
    const centralIndex = Math.floor(center / elementWidth);
    return centralIndex % images.length;
  };

  const handleImageClick = () => {
    const centralIndex = calculateCentralImageIndex();
    const centralImage = infiniteImages[centralIndex];

    console.log(centralImage); // You can handle the central image here

    if (expandedIndex === null) {
      setExpandedIndex(centralIndex);
      localStorage.setItem("selectedImageId", centralImage.key); // Store the selected central image ID in localStorage
    }
  };

  const handleOverlayClick = () => {
    setExpandedIndex(null);
  };

  const calculateOpacityAndScale = (index: number) => {
    if (expandedIndex === null) {
      if (!scrollRef.current) return { opacity: 1, scale: 1 };

      const elementWidth = scrollRef.current.offsetWidth / 3;
      const center = scrollPosition + scrollRef.current.offsetWidth / 2;
      const elementCenter = index * elementWidth + elementWidth / 2;

      const distanceFromCenter = Math.abs(center - elementCenter);
      const isCentral = distanceFromCenter < elementWidth / 2;
      const opacity = isCentral ? 1 : 0.4;

      const scale = isCentral ? 1 : 1;

      return { opacity, scale };
    } else {
      return {
        opacity: expandedIndex === index ? 1 : 0.4,
        scale: expandedIndex === index ? 2 : 1,
      };
    }
  };

  return (
    <div className="relative flex py-3 overflow-hidden">
      <AnimatePresence>
        {expandedIndex !== null && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3 }}
            />
            {/* Expanded Image */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              onClick={handleOverlayClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <motion.img
                src={infiniteImages[expandedIndex].src}
                alt={infiniteImages[expandedIndex].caption}
                className="w-full h-full object-cover"
                onClick={(e) => e.stopPropagation()}
              />
              <motion.div
                className="absolute inset-0 z-[100] before:content-['']
                before:absolute
                before:inset-0
                before:block
                before:bg-gradient-to-t
                before:from-black
                before:to-transparent
                before:opacity-75
                before:z-[-5]
                "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              />
              <motion.div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
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
        <div className="inline-flex mt-[120px]  items-center gap-4 justify-center">
          {infiniteImages.map((image, index) => {
            const { opacity, scale } = calculateOpacityAndScale(index);

            return (
              <motion.div
                key={index}
                className={clsx(
                  "inline-block min-w-[calc(100vw)]    relative transition-transform duration-300"
                )}
                style={{
                  width: "calc(100vw / 3.2)",
                  minWidth: "calc(100vw/3.2)",
                  maxHeight: "500px",
                  height: "500px",
                  minHeight: "500px",
                  overflow: "hidden",
                }}
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity }}
                transition={{ duration: 0.5 }}
              >
                <TransitionLink href="/projects/project">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className=" h-[350px] min-w-[600px] object-cover shadow-md"
                    style={{ opacity }}
                    onClick={() => expandedIndex === null && handleImageClick()}
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

export default HorizontalScroll;
