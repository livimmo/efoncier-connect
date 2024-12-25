import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const SliderControls = ({
  onPrev,
  onNext,
}: SliderControlsProps) => {
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrev}
        className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};