import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { RoleSelection } from "./register/RoleSelection";
import { RegisterForm } from "./register/RegisterForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { UserRole } from "@/types/auth";

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("owner");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleWhatsAppLogin = () => {
    toast({
      title: "Inscription WhatsApp",
      description: "Cette fonctionnalité sera bientôt disponible",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inscription à eFoncier</DialogTitle>
          <DialogDescription>
            Créez votre compte pour accéder à tous nos services
          </DialogDescription>
        </DialogHeader>

        <RoleSelection 
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />

        <RegisterForm 
          role={selectedRole}
          onSuccess={() => {
            onOpenChange(false);
            navigate("/dashboard");
          }}
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