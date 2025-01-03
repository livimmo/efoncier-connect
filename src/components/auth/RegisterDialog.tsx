import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { RoleSelection } from "./register/RoleSelection";
import { RegisterForm } from "./register/RegisterForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { UserRole } from "@/types/auth";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("owner");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleWhatsAppLogin = () => {
    toast({
      title: "Inscription WhatsApp",
      description: "Cette fonctionnalité sera bientôt disponible",
    });
  };

  const handleSuccess = () => {
    toast({
      title: "Compte créé avec succès !",
      description: "Un email de confirmation vous a été envoyé.",
    });
    onOpenChange(false);
    navigate("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-y-auto">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Créer un Compte sur eFoncier
          </DialogTitle>
          <DialogDescription>
            Inscrivez-vous pour accéder à vos fonctionnalités personnalisées.
            <br />
            Veuillez choisir votre profil utilisateur pour continuer.
          </DialogDescription>
        </DialogHeader>

        <RoleSelection 
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />

        <RegisterForm 
          selectedRole={selectedRole}
          onSuccess={handleSuccess}
        />

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou inscrivez-vous avec
            </span>
          </div>
        </div>

        <SocialLoginButtons 
          isLoading={isLoading}
          onWhatsAppLogin={handleWhatsAppLogin}
        />

        <div className="text-center text-sm">
          Déjà un compte ?{" "}
          <button
            onClick={() => {
              onOpenChange(false);
              navigate("/login");
            }}
            className="text-primary hover:underline"
          >
            Se connecter
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}