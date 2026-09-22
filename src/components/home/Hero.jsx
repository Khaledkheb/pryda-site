import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import { getWallpapers } from "../../utils/wallpapers";

const slides = getWallpapers(5);

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef(null);

  const totalSlides = slides.length;

  const currentSlide = useMemo(() => slides[activeSlide], [activeSlide]);

  const goToSlide = useCallback(
    (index) => {
      if (!totalSlides) return;

      const nextIndex = (index + totalSlides) % totalSlides;

      setActiveSlide(nextIndex);
    },
    [totalSlides],
  );

  const goToNext = useCallback(() => {
    goToSlide(activeSlide + 1);
  }, [activeSlide, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(activeSlide - 1);
  }, [activeSlide, goToSlide]);

  /*
   * Auto-play
   */
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % totalSlides);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, totalSlides]);

  /*
   * Keyboard accessibility
   */
  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    carousel.addEventListener("keydown", handleKeyDown);

    return () => {
      carousel.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious, goToSlide, totalSlides]);

  /*
   * If no images are found, keep the component safe.
   */
  if (!totalSlides) {
    return (
      <section className="py-10 sm:py-16">
        <Container>
          <GlassCard className="p-6 sm:p-10">
            <p className="text-label">PRYDA+ HERO</p>

            <h1 className="text-display mt-4">
              A future vision for web design.
            </h1>

            <p className="text-body mt-5 max-w-2xl">
              We design and build websites considered down to the last detail,
              from the first pixel to the final line of code — clean structure,
              a distinctive visual identity, and interfaces people genuinely
              enjoy browsing.
            </p>
          </GlassCard>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="py-6 sm:py-10 lg:py-14"
    >
      <Container>
        <GlassCard className="overflow-hidden" strong>
          <div
            ref={carouselRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured work"
            className="
              grid
              gap-0
              outline-none
              lg:grid-cols-[0.9fr_1.1fr]
            "
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* =========================
                LEFT / CONTENT
            ========================== */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-label">PRYDA+ DESIGN STUDIO</p>

              <h1 className="text-display mt-4 max-w-xl">
                A future vision for web design.
              </h1>

              <p className="text-body mt-6 max-w-xl">
                We design and build websites considered down to the last detail,
                from the first pixel to the final line of code — clean
                structure, a distinctive visual identity, and interfaces people
                genuinely enjoy browsing.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#portfolio">View Our Work</Button>

                <Button variant="secondary" href="#contact">
                  Get a Quote
                </Button>
              </div>
            </div>

            {/* =========================
                RIGHT / VISUAL
            ========================== */}
            <div className="relative min-h-80 sm:min-h-150 lg:min-h-130">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/5" />

                <img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={`PRYDA+ project ${activeSlide + 1}`}
                  className="
                    hero-slide
                    h-full
                    w-full
                    object-cover"
                />

                {/* Dark image overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-pryda-navy/60
                    via-transparent
                    to-pryda-navy/10
                  "
                />

                {/* Aqua glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-56
                    w-56
                    rounded-full
                    bg-cyan-300/10
                    blur-3xl
                  "
                />

                {/* Watermark */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    right-5
                    top-5
                    text-sm
                    font-bold
                    tracking-[0.3em]
                    text-white/30
                  "
                >
                  +PRYDA
                </div>

                {/* Slide number */}
                <div className="absolute bottom-5 left-5" dir="ltr">
                  <span className="text-small text-white/50">
                    <span>Project</span>
                    <span className="mx-1 text-white/20">•</span>
                    {String(activeSlide + 1).padStart(2, "0")}
                    {" / "}
                    {String(totalSlides).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* =========================
                  CONTROLS
              ========================== */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <IconButton label="Previous image" onClick={goToPrevious}>
                  <span aria-hidden="true" dir="ltr" className="inline-block">
                    ←
                  </span>
                </IconButton>

                <IconButton label="Next image" onClick={goToNext}>
                  <span aria-hidden="true" dir="ltr" className="inline-block">
                    →
                  </span>
                </IconButton>
              </div>
            </div>

            {/* =========================
                PAGINATION
            ========================== */}
            <div
              dir="ltr"
              role="tablist"
              className="
                flex
                items-center
                justify-center
                gap-2
                border-t
                border-white/5
                px-6
                py-4
                lg:col-span-2
              "
              aria-label="Select project image"
            >
              {slides.map((slide, index) => {
                const isActive = index === activeSlide;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Go to image ${index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goToSlide(index)}
                    className={`
                      h-1.5
                      rounded-full
                      transition-all
                      duration-300
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-cyan-300
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-pryda-navy
                      ${
                        isActive
                          ? "w-8 bg-cyan-300 shadow-[0_0_14px_rgba(36,215,232,0.45)]"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }
                    `}
                  />
                );
              })}
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}

export default Hero;
