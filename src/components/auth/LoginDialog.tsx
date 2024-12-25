import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { EmailLoginForm } from "./EmailLoginForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { UserRole } from "@/types/auth";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("owner");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      
      const user = {
        id: crypto.randomUUID(),
        email,
        role: selectedRole,
        first_name: "John",
        last_name: "Doe"
      };

      localStorage.setItem('user', JSON.stringify(user));
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur eFoncier !",
      });

      onOpenChange(false);
      
      switch (selectedRole) {
        case "developer":
          navigate("/developer/dashboard");
          break;
        case "commune":
          navigate("/commune/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants incorrects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppLogin = () => {
    toast({
      title: "Connexion WhatsApp",
      description: "Cette fonctionnalité sera bientôt disponible",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full hover:bg-slate-100"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <DialogHeader>
          <DialogTitle>Connexion à eFoncier</DialogTitle>
          <DialogDescription>
            Connectez-vous pour accéder à votre espace personnel
          </DialogDescription>
        </DialogHeader>

        <EmailLoginForm 
          isLoading={isLoading} 
          onSubmit={handleLogin}
          selectedRole={selectedRole}
          onRoleChange={(role: UserRole) => setSelectedRole(role)}
        />

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continuez avec
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
            onClick={() => {
              onOpenChange(false);
              navigate("/register");
            }}
            className="text-primary hover:underline"
          >
            Créer un compte
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}