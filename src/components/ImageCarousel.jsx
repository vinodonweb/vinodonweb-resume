import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Handle when there are no images
  if (!images || images.length === 0) {
    return (
      <div className="h-64 bg-gray-800 flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  const handleNext = () => {
    setIsImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setIsImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="relative h-64 bg-gray-900 overflow-hidden">
      {/* Loading indicator */}
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="h-full w-full flex items-center justify-center bg-gray-800"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={images[currentIndex]}
            alt={`Project screenshot ${currentIndex + 1}`}
            className="max-h-full max-w-full h-auto w-auto object-contain"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
            onLoad={handleImageLoad}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsImageLoaded(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel; 