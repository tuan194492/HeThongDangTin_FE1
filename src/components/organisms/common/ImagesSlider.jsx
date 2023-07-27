/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const previousSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };
  if (images.length < 1) {
    images = [...images, 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'];
  }

  return (
    <div className="flex items-center justify-center">
        <div className="relative flex items-center">
            
            <img className="max-w-[600px] h-auto" src={images[currentIndex]} alt="Slider"/>

            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent border-none text-white text-2xl cursor-pointer"
                onClick={previousSlide}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-none text-white text-2xl cursor-pointer"
                onClick={nextSlide}
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    </div>
  );
}