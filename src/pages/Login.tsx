import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tentative de connexion avec Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Gestion spécifique des erreurs d'authentification
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Email ou mot de passe incorrect");
        }
        throw error;
      }

      if (data.user) {
        // Stockage des informations utilisateur
        const user = {
          id: data.user.id,
          email: data.user.email,
          role: "owner", // Par défaut, on met le rôle "owner"
          first_name: data.user.user_metadata?.first_name || "Utilisateur",
          last_name: data.user.user_metadata?.last_name || "",
        };

        localStorage.setItem("user", JSON.stringify(user));

        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur eFoncier !",
        });

        // Redirection vers le tableau de bord
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-geometric-pattern bg-cover bg-center auth-page">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50" />
      
      <div className="container relative flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          {/* Logo et Titre */}
          <div className="text-center space-y-2">
            <img 
              src="/logo.svg" 
              alt="eFoncier" 
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white">
              Accès sécurisé à la plateforme eFoncier
            </h1>
            <p className="text-gray-200">
              Connectez-vous pour explorer la cartographie foncière du Maroc
            </p>
          </div>

          {/* Formulaire de connexion */}
          <Card className="p-6 backdrop-blur-sm bg-white/95">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => 
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm cursor-pointer"
                  >
                    Se souvenir de moi
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="px-0 text-primary"
                  onClick={() => navigate("/reset-password")}
                >
                  Mot de passe oublié ?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Se connecter
              </Button>
            </form>
          </Card>

          {/* Lien d'inscription */}
          <div className="text-center">
            <p className="text-white">
              Pas encore de compte ?{" "}
              <Button
                variant="link"
                className="text-primary-foreground hover:text-primary-foreground/90 p-0"
                onClick={() => navigate("/register")}
              >
                Créer un compte
              </Button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;