import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, MessageCircle, Mail, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Succès",
        description: "Vous êtes maintenant connecté.",
      });
      onOpenChange(false);
      navigate("/dashboard");
    }, 1000);
  }

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
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Succès",
          description: "Connexion réussie via WhatsApp !",
        });
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
              <InputOTP
                value={otp}
                onChange={(value) => {
                  setOTP(value);
                  if (value.length === 6) {
                    verifyOTP();
                  }
                }}
                maxLength={6}
                render={({ slots }) => (
                  <InputOTPGroup className="gap-2">
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} index={index} />
                    ))}
                  </InputOTPGroup>
                )}
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
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      placeholder="nom@exemple.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      disabled={isLoading}
                    />
                  </div>
                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Mail className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Se connecter avec Email
                  </Button>
                </div>
              </form>
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
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  onClick={handleWhatsAppLogin}
                  className={cn(
                    "bg-[#25D366] text-white hover:bg-[#25D366]/90",
                    "dark:hover:bg-[#25D366]/70"
                  )}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  className={cn(
                    "bg-[#4267B2] text-white hover:bg-[#4267B2]/90",
                    "dark:hover:bg-[#4267B2]/70"
                  )}
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
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