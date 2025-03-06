
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    year: string;
    category: string;
  }[];
  initialIndex?: number;
}

const ImageGallery = ({ images, initialIndex = 0 }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  if (images.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-blue-dark">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="image-container cursor-pointer hover-lift animate-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => openModal(index)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="aspect-video object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className="text-white text-sm font-medium">{image.year}</span>
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-white text-xs">
                {image.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-1 z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-semibold">
                      {images[currentIndex].year}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {images[currentIndex].category}
                    </p>
                  </div>
                  <div className="text-white text-sm">
                    {currentIndex + 1} / {images.length}
                  </div>
                </div>
              </div>
              
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-sm rounded-full p-2 text-white hover:bg-opacity-50 transition-all"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 backdrop-blur-sm rounded-full p-2 text-white hover:bg-opacity-50 transition-all"
                onClick={goToNext}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
