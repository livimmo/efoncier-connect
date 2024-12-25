import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SliderContent } from "./slider/SliderContent";
import { SliderControls } from "./slider/SliderControls";
import { SliderProgress } from "./slider/SliderProgress";
import { SliderPagination } from "./slider/SliderPagination";
import { useMediaQuery } from "@/hooks/use-media-query";

const slides = [
  {
    type: "ad" as const,
    title: "Explorez Notre Carte Interactive des Terrains",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    cta: {
      text: "Explorer la Carte",
      link: "/map"
    }
  },
  {
    type: "ad" as const,
    title: "Effectuez vos Paiements en Toute Sécurité",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    cta: {
      text: "Payer Maintenant",
      link: "/payment"
    }
  },
  {
    type: "news" as const,
    title: "Mise à jour du Statut Fiscal pour les Terrains en Zone Urbaine",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    cta: {
      text: "Voir les détails",
      link: "/news/fiscal-update"
    }
  },
  {
    type: "flash" as const,
    title: "Flash News : Nouveaux Terrains Disponibles à Rabat – Zone Industrielle",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    cta: {
      text: "Lire la news",
      link: "/news/new-lands"
    }
  },
  {
    type: "event" as const,
    title: "Prochain Forum de l'Immobilier Foncier – 15 Avril 2024",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
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
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
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
