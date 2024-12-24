import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OTPInput } from "./OTPInput";
import { EmailLoginForm } from "./EmailLoginForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { supabase } from "@/integrations/supabase/client";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting login with:", { email, selectedRole });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur eFoncier !",
      });
      
      onOpenChange(false);
      navigate("/profile");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppLogin = () => {
    setShowOTP(true);
    toast({
      title: "Code envoyé",
      description: "Un code de vérification a été envoyé sur WhatsApp",
    });
  };

  const verifyOTP = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Succès",
          description: "Connexion réussie via WhatsApp !",
        });
        onOpenChange(false);
        navigate("/profile");
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bienvenue sur eFoncier</DialogTitle>
          <DialogDescription>
            Choisissez votre méthode de connexion préférée
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          {showOTP ? (
            <div className="grid gap-4">
              <Label>Entrez le code reçu sur WhatsApp</Label>
              <OTPInput
                value={otp}
                onChange={setOTP}
                onComplete={verifyOTP}
              />
              <div className="text-center text-sm">
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setShowOTP(false)}
                >
                  Retour aux options de connexion
                </Button>
              </div>
            </div>
          ) : (
            <>
              <EmailLoginForm 
                isLoading={isLoading} 
                onSubmit={handleEmailLogin}
                selectedRole={selectedRole}
                onRoleChange={setSelectedRole}
              />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continuer avec
                  </span>
                </div>
              </div>
              <SocialLoginButtons
                isLoading={isLoading}
                onWhatsAppLogin={handleWhatsAppLogin}
              />
              <div className="text-center text-sm">
                Vous n'avez pas de compte ?{" "}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => {
                    onOpenChange(false);
                    navigate("/register");
                  }}
                >
                  Inscrivez-vous ici
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}