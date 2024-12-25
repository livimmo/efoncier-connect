import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  type: "ad" | "news" | "flash" | "event";
  title: string;
  image: string;
  cta: {
    text: string;
    link: string;
  };
}

interface SliderContentProps {
  slides: Slide[];
  currentSlide: number;
  isMobile: boolean;
}

export const SliderContent = ({ slides, currentSlide, isMobile }: SliderContentProps) => {
  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className={cn(
            "absolute inset-x-0 text-white p-6 flex flex-col items-center text-center",
            isMobile ? "bottom-0 pb-16" : "bottom-1/4"
          )}>
            {slide.type === "flash" && (
              <span className="animate-pulse text-red-500 font-bold mb-2">
                ⚡ FLASH
              </span>
            )}
            
            <h2 className={cn(
              "font-bold mb-6 max-w-3xl mx-auto",
              isMobile ? "text-xl" : "text-3xl"
            )}>
              {slide.title}
            </h2>
            
            <Button
              asChild
              size={isMobile ? "default" : "lg"}
              className="animate-fade-in"
            >
              <a href={slide.cta.link}>{slide.cta.text}</a>
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};