import { Button } from "@/components/ui/button";
import { Minimize2, Maximize2, X } from "lucide-react";

interface ParcelHeaderProps {
  title: string;
  isDragging: boolean;
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  handleToggleExpand: () => void;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

export const ParcelHeader = ({
  title,
  isDragging,
  isMinimized,
  setIsMinimized,
  handleToggleExpand,
  onClose,
  onMouseDown,
}: ParcelHeaderProps) => {
  return (
    <div
      className={`flex items-center justify-between p-2 bg-primary text-primary-foreground rounded-t-lg ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={onMouseDown}
    >
      <h3 className="text-sm font-medium truncate flex-1">{title}</h3>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-primary-foreground/20"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-primary-foreground/20"
          onClick={handleToggleExpand}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-primary-foreground/20"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};