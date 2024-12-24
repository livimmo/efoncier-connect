import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur eFoncier !",
          });
          navigate("/dashboard");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center">
            Bienvenue sur eFoncier
          </h1>
          <div className="bg-card rounded-lg shadow-lg p-6">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(var(--color-primary))',
                      brandAccent: 'rgb(var(--color-primary))',
                    },
                  },
                },
              }}
              providers={["google"]}
              redirectTo={`${window.location.origin}/dashboard`}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Adresse email",
                    password_label: "Mot de passe",
                    button_label: "Se connecter",
                    loading_button_label: "Connexion en cours...",
                    social_provider_text: "Continuer avec {{provider}}",
                    link_text: "Vous avez déjà un compte ? Connectez-vous",
                  },
                  sign_up: {
                    email_label: "Adresse email",
                    password_label: "Mot de passe",
                    button_label: "S'inscrire",
                    loading_button_label: "Inscription en cours...",
                    social_provider_text: "Continuer avec {{provider}}",
                    link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;