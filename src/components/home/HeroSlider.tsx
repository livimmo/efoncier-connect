import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SliderContent } from "./slider/SliderContent";
import { SliderControls } from "./slider/SliderControls";
import { SliderProgress } from "./slider/SliderProgress";
import { SliderPagination } from "./slider/SliderPagination";
import { useMediaQuery } from "@/hooks/use-media-query";

const slides = [
  {
    type: "ad",
    title: "Profitez d'une Offre Exclusive sur vos Transactions Foncières !",
    image: "/photo-1506744038136-46273834b3fb",
    cta: {
      text: "Découvrir l'offre",
      link: "/offers"
    }
  },
  {
    type: "news",
    title: "Mise à jour du Statut Fiscal pour les Terrains en Zone Urbaine",
    image: "/photo-1426604966848-d7adac402bff",
    cta: {
      text: "Voir les détails",
      link: "/news/fiscal-update"
    }
  },
  {
    type: "flash",
    title: "Flash News : Nouveaux Terrains Disponibles à Rabat – Zone Industrielle",
    image: "/photo-1501854140801-50d01698950b",
    cta: {
      text: "Lire la news",
      link: "/news/new-lands"
    }
  },
  {
    type: "event",
    title: "Prochain Forum de l'Immobilier Foncier – 15 Avril 2024",
    image: "/photo-1615729947596-a598e5de0ab3",
    cta: {
      text: "S'inscrire maintenant",
      link: "/events/forum-2024"
    }
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;
    
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  return (
    <div 
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carrousel de contenu"
    >
      <SliderContent 
        slides={slides} 
        currentSlide={currentSlide}
        isMobile={isMobile}
      />
      
      <SliderControls
        onPrev={prevSlide}
        onNext={nextSlide}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
      />
      
      <SliderProgress isPlaying={isPlaying} />
      
      <SliderPagination
        totalSlides={slides.length}
        currentSlide={currentSlide}
        onChange={setCurrentSlide}
      />
    </div>
  );
};