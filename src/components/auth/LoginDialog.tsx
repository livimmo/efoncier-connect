import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OTPInput } from "./OTPInput";
import { EmailLoginForm } from "./EmailLoginForm";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useLogin } from "@/hooks/useLogin";
import { UserRole } from "@/types";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("taxpayer");

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const success = await login({
      email,
      password,
      role: selectedRole
    });

    if (success) {
      onOpenChange(false);
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleWhatsAppLogin = () => {
    // Implémentation à venir
    console.log("WhatsApp login clicked");
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
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription>
            Connectez-vous à votre compte pour accéder à votre espace personnel
          </DialogDescription>
        </DialogHeader>

        {showOTP ? (
          <OTPInput
            value={otp}
            onChange={setOTP}
            onComplete={verifyOTP}
          />
        ) : (
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <EmailLoginForm
                isLoading={isLoading}
                onSubmit={handleEmailLogin}
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
              />
            </TabsContent>
            <TabsContent value="social">
              <SocialLoginButtons 
                isLoading={isLoading}
                onWhatsAppLogin={handleWhatsAppLogin}
              />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};