import React, { useEffect, useState } from 'react';


const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg,webp}', { eager: true });

const ImagePreloader = ({ onComplete }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [imagePaths, setImagePaths] = useState([]); 

  useEffect(() => {
    
    const resolvedImages = Object.values(images).map((module) => module.default || module);

    if (resolvedImages.length === 0) {
      console.warn("No images found in '../assets/images/'. Check your path or file extensions.");
    }

    setImagePaths(resolvedImages);
  }, []);

  useEffect(() => {
    if (imagePaths.length === 0) return;

    let isMounted = true;

    const preloadImages = async () => {
      const promises = imagePaths.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = (error) => {
            console.error(`Error loading image: ${src}`, error);
            reject(error);
          };
        });
      });

      try {
        await Promise.all(promises);
        if (isMounted) {
          onComplete(); 
        }
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [imagePaths, onComplete]);

  useEffect(() => {
    if (imagePaths.length === 0) return;

    const interval = setInterval(() => {
      setLoadedCount((prev) => (prev < imagePaths.length ? prev + 1 : prev));
    }, 100); 
    return () => clearInterval(interval);
  }, [imagePaths]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Loading...</h1>
      <p>{Math.round((loadedCount / imagePaths.length) * 100)}% completed</p>
    </div>
  );
};

export default ImagePreloader;

