import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

interface BlurredFieldProps {
  value: string | number;
  onBlurredClick: () => void;
  className?: string;
}

export const BlurredField = ({ value, onBlurredClick, className }: BlurredFieldProps) => {
  const { profile } = useAuth();
  const isAuthenticated = !!profile;

  if (isAuthenticated) {
    return <span className={className}>{value}</span>;
  }

  return (
    <div className="relative">
      <span className={cn("blur-sm select-none", className)}>{value}</span>
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity"
        onClick={onBlurredClick}
      >
        <Lock className="w-4 h-4" />
        Connectez-vous pour voir
      </Button>
    </div>
  );
};