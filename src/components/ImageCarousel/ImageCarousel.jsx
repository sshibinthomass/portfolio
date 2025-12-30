import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageCarousel.css';

const ImageCarousel = ({ images, alt, autoPlayInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    if (!images || images.length === 0) {
        return null;
    }

    // If only one image, just display it without carousel controls
    if (images.length === 1) {
        return (
            <img
                src={images[0]}
                alt={alt}
                className="single-image"
            />
        );
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Auto-play functionality
    useEffect(() => {
        if (isPaused || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [currentIndex, isPaused, images.length, autoPlayInterval]);

    return (
        <div
            className="carousel-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="carousel-images">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`${alt} - ${currentIndex + 1}`}
                        className="carousel-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                className="carousel-button carousel-button-prev"
                onClick={handlePrevious}
                aria-label="Previous image"
            >
                ‹
            </button>
            <button
                className="carousel-button carousel-button-next"
                onClick={handleNext}
                aria-label="Next image"
            >
                ›
            </button>

            {/* Indicators */}
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
