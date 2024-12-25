import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { EmailLoginForm } from "./EmailLoginForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { RegisterDialog } from "./RegisterDialog";
import { UserRole } from "@/types/auth";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("owner");
  const navigate = useNavigate();

  const handleWhatsAppLogin = () => {
    // Simulate WhatsApp login functionality
  };

  const handleSuccess = () => {
    onOpenChange(false);
    navigate("/dashboard");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      handleSuccess();
    }, 1500);
  };

  if (showRegister) {
    return (
      <RegisterDialog 
        open={open} 
        onOpenChange={(open) => {
          if (!open) {
            setShowRegister(false);
          }
          onOpenChange(open);
        }} 
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">
              Se connecter à eFoncier
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Connectez-vous pour accéder à vos fonctionnalités personnalisées
          </DialogDescription>
        </DialogHeader>

        <EmailLoginForm 
          isLoading={isLoading}
          onSubmit={handleSubmit}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          onSuccess={handleSuccess}
        />

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou connectez-vous avec
            </span>
          </div>
        </div>

        <SocialLoginButtons 
          isLoading={isLoading}
          onWhatsAppLogin={handleWhatsAppLogin}
        />

        <div className="text-center text-sm">
          Pas encore de compte ?{" "}
          <button
            onClick={() => setShowRegister(true)}
            className="text-primary hover:underline"
          >
            Créer un compte
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}