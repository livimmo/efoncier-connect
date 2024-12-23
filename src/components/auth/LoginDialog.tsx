import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Github, Mail } from "lucide-react";
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

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate login - replace with actual authentication
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
            <Button variant="outline" type="button" disabled={isLoading}>
              <Github className="mr-2 h-4 w-4" />
              Github
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
        </div>
      </DialogContent>
    </Dialog>
  );
}