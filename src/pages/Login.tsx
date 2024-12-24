import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

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
      (event, session) => {
        console.log("Auth event:", event);
        if (event === 'SIGNED_IN' && session) {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur eFoncier !",
          });
          navigate("/dashboard");
        } else if (event === 'USER_DELETED' || event === 'SIGNED_OUT') {
          navigate("/");
        } else if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Réinitialisation du mot de passe",
            description: "Veuillez vérifier votre boîte mail pour réinitialiser votre mot de passe.",
          });
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
          <Card className="p-6">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#C1272D',
                      brandAccent: '#006233',
                    },
                  },
                },
                className: {
                  container: 'flex flex-col gap-4',
                  button: 'w-full',
                  input: 'rounded-md',
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
                    email_input_placeholder: "Votre adresse email",
                    password_input_placeholder: "Votre mot de passe",
                  },
                  sign_up: {
                    email_label: "Adresse email",
                    password_label: "Mot de passe",
                    button_label: "S'inscrire",
                    loading_button_label: "Inscription en cours...",
                    social_provider_text: "Continuer avec {{provider}}",
                    link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                    email_input_placeholder: "Votre adresse email",
                    password_input_placeholder: "Choisissez un mot de passe",
                  },
                  forgotten_password: {
                    button_label: "Réinitialiser le mot de passe",
                    link_text: "Mot de passe oublié ?",
                    confirmation_text: "Vérifiez vos emails pour réinitialiser votre mot de passe",
                  },
                },
              }}
            />
          </Card>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            En vous connectant, vous acceptez nos{" "}
            <a href="/terms" className="text-primary hover:underline">
              Conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;