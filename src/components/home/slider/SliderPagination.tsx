import { Button } from "@/components/ui/button";

interface SliderPaginationProps {
  totalSlides: number;
  currentSlide: number;
  onChange: (index: number) => void;
}

export const SliderPagination = ({
  totalSlides,
  currentSlide,
  onChange,
}: SliderPaginationProps) => {
  return (
    <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <Button
          key={index}
          variant="outline"
          size="icon"
          className={`w-2 h-2 p-0 rounded-full ${
            currentSlide === index
              ? "bg-primary border-primary"
              : "bg-white/20 border-white/20"
          }`}
          onClick={() => onChange(index)}
          aria-label={`Aller à la diapositive ${index + 1}`}
        />
      ))}
    </div>
  );
};