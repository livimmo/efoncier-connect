import { Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CallButtonProps {
  variant?: "header" | "floating";
  className?: string;
  isAgentAvailable: boolean;
  onClick: () => void;
}

export const CallButton = ({ 
  variant = "floating", 
  className,
  isAgentAvailable,
  onClick
}: CallButtonProps) => {
  return (
    <Button
      variant="ghost"
      size={variant === "header" ? "icon" : "lg"}
      onClick={onClick}
      className={cn(
        variant === "floating" && "fixed bottom-20 right-4 z-50 rounded-full shadow-lg",
        "group",
        className
      )}
    >
      {variant === "header" ? (
        <Headset className="h-5 w-5" />
      ) : (
        <div className="flex items-center gap-2">
          <Headset className="h-6 w-6" />
          <span className="hidden group-hover:inline-block">
            Support Client
          </span>
        </div>
      )}
      {isAgentAvailable && (
        <Badge 
          variant="default" 
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500 p-0"
        />
      )}
    </Button>
  );
};