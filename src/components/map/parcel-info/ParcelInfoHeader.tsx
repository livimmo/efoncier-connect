import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ParcelInfoHeaderProps {
  title: string;
  ownerName: string;
  onClose: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export const ParcelInfoHeader = ({
  title,
  ownerName,
  onClose,
  onMouseDown,
}: ParcelInfoHeaderProps) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/taxpayer/properties/${title}`);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-2 bg-primary text-primary-foreground",
        "rounded-t-lg cursor-grab active:cursor-grabbing select-none"
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex-1 min-w-0 mr-2" onClick={handleTitleClick}>
        <h3 className="text-sm font-medium truncate hover:underline cursor-pointer">
          {title}
        </h3>
      </div>
      <div className="flex items-center gap-1">
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