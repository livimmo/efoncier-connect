import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { useState } from "react";

interface BlurredFieldProps {
  value: string | number;
  className?: string;
}

export const BlurredField = ({ value, className }: BlurredFieldProps) => {
  const { profile } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const isAuthenticated = !!profile;

  if (isAuthenticated) {
    return <span className={className}>{value}</span>;
  }

  return (
    <>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <div className="relative group">
        <span className={cn("blur-sm select-none", className)}>{value}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute inset-0 w-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
          onClick={() => setLoginOpen(true)}
        >
          <Lock className="w-4 h-4" />
          Se connecter pour voir
        </Button>
      </div>
    </>
  );
};