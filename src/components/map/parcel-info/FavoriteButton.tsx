import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
  parcelId: string;
  initialState?: boolean;
  variant?: "default" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const FavoriteButton = ({ 
  parcelId, 
  initialState = false,
  variant = "ghost",
  size = "icon"
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialState);
  const { toast } = useToast();

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: isFavorite 
        ? "Le bien a été retiré de vos favoris"
        : "Le bien a été ajouté à vos favoris",
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleFavorite}
      className="hover:text-yellow-500"
    >
      <Star 
        className={`h-4 w-4 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} 
      />
    </Button>
  );
};