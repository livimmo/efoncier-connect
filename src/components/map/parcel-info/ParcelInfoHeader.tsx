import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParcelInfoHeaderProps {
  title: string;
  ownerName: string;
  isMinimized: boolean;
  isDragging: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

export const ParcelInfoHeader = ({
  title,
  ownerName,
  isMinimized,
  isDragging,
  onToggleMinimize,
  onClose,
  onMouseDown,
}: ParcelInfoHeaderProps) => {
  return (
    <div 
      className={cn(
        "bg-background/95 backdrop-blur-sm p-1.5 rounded-t-lg",
        "border border-border/50",
        "flex justify-between items-center",
        "shadow-sm",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground/90 truncate">
          {title}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {ownerName}
        </div>
      </div>
      <div className="flex gap-1 ml-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 hover:bg-background/80"
          onClick={onToggleMinimize}
        >
          {isMinimized ? 
            <Maximize2 className="h-3 w-3" /> : 
            <Minimize2 className="h-3 w-3" />
          }
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 hover:bg-background/80"
          onClick={onClose}
        >
          ×
        </Button>
      </div>
    </div>
  );
};