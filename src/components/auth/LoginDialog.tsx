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
import { OTPInput } from "./OTPInput";
import { EmailLoginForm } from "./EmailLoginForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useLogin } from "@/hooks/useLogin";
import { UserRole } from "./AuthProvider";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("taxpayer");

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || !selectedRole) {
      return;
    }

    const success = await login({
      email,
      password,
      role: selectedRole
    });

    if (success) {
      onOpenChange(false);
    }
  };

  const handleWhatsAppLogin = () => {
    setShowOTP(true);
  };

  const verifyOTP = () => {
    if (otp.length === 6) {
      setTimeout(() => {
        onOpenChange(false);
        navigate("/dashboard");
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