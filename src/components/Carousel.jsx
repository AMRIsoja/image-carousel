import "./Carousel.css";
import { useEffect, useRef, useState } from "react";

function Carousel({
    images,
    autoPlay = true,
    interval = 3000,
    showDots = true,
    showArrows = true,
}) {
  if (!images || images.length === 0) {
  return <p>No images available.</p>;
}
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    function nextSlide() {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }

    function prevSlide() {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }

    function goToSlide(index) {
        setCurrentIndex(index);
    }

    function handleTouchStart(event) {
        const touchX = event.touches[0].clientX;
        touchStartX.current = touchX;
        touchEndX.current = touchX;
        setIsPaused(true);
    }

    function handleTouchMove(event) {
        touchEndX.current = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            nextSlide();
        } else if (distance < -minSwipeDistance) {
            prevSlide();
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
        setIsPaused(false);
    }

    const currentImage = images[currentIndex];

    useEffect(() => {
        if (!autoPlay || isPaused) return;

        const intervalId = setInterval(() => {
            nextSlide();
        }, interval);

        return () => clearInterval(intervalId);
    }, [currentIndex, isPaused, autoPlay, interval]);

    return (
        <section
            className="carousel"
            aria-label="Image carousel"
            tabIndex="0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={(event) => {
                if (event.key === "ArrowLeft") prevSlide();
                if (event.key === "ArrowRight") nextSlide();
            }}
        >
            <div className="carousel__image-container">
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="carousel__image"
                    loading="lazy"
                />
            </div>
            <p className="sr-only" aria-live="polite">
              Slide {currentIndex + 1} of {images.length}: {currentImage.alt}
            </p>

            {showArrows && (
                <>
                    <button
                        className="carousel__button carousel__button--prev"
                        onClick={prevSlide}
                        aria-label="Previous image"
                    >
                        &#10094;
                    </button>

                    <button
                        className="carousel__button carousel__button--next"
                        onClick={nextSlide}
                        aria-label="Next image"
                    >
                        &#10095;
                    </button>
                </>
            )}

            {showDots && (
                <div className="carousel__dots" aria-label="Slide indicators">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            className={`carousel__dot ${index === currentIndex ? "active" : ""}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentIndex ? "true" : undefined}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Carousel;
