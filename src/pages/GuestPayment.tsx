import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, CreditCard, Bell, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RegisterDialog } from "@/components/auth/RegisterDialog";
import { LoginDialog } from "@/components/auth/LoginDialog";

const GuestPayment = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [reference, setReference] = useState("");
  const [cin, setCin] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference || !cin) {
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Les informations saisies sont incorrectes. Veuillez vérifier votre numéro de référence ou votre CIN.",
      });
      return;
    }
    // Simulate verification
    toast({
      title: "Vérification en cours",
      description: "Veuillez patienter...",
    });
  };

  const benefits = [
    {
      icon: FileText,
      title: "Suivi Simplifié",
      description: "Consultez vos paiements et statuts TNB en temps réel."
    },
    {
      icon: Bell,
      title: "Notifications Automatiques",
      description: "Rappelez-vous chaque échéance."
    },
    {
      icon: FileText,
      title: "Accès aux Documents",
      description: "Téléchargez vos reçus et certificats."
    },
    {
      icon: Shield,
      title: "Sécurité Optimale",
      description: "Paiements sécurisés et cryptés."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Paiement de la Taxe TNB – Accès Restreint</h1>
            <p className="text-muted-foreground">
              Payez facilement votre taxe TNB et gérez vos biens en toute simplicité.
            </p>
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Lock className="h-4 w-4 mr-2" />
              Connexion sécurisée et cryptée pour un paiement fiable.
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column - Payment Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paiement Sans Compte</CardTitle>
                  <CardDescription>
                    Si vous souhaitez payer sans créer de compte, renseignez les informations suivantes :
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVerification} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="reference" className="text-sm font-medium">
                        Numéro de Référence TNB
                      </label>
                      <Input
                        id="reference"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="Ex: TNB-2024-XXXXX"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cin" className="text-sm font-medium">
                        CIN du Propriétaire
                      </label>
                      <Input
                        id="cin"
                        value={cin}
                        onChange={(e) => setCin(e.target.value)}
                        placeholder="Ex: AB123456"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Vérifier mes Informations
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Créez votre Compte Propriétaire</CardTitle>
                  <CardDescription>
                    Pour une gestion simplifiée de vos paiements TNB, inscrivez-vous dès maintenant.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{benefit.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="space-y-4">
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => setShowRegister(true)}
                    >
                      Créer un Compte Propriétaire
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowLogin(true)}
                    >
                      Déjà un compte ? Se connecter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <RegisterDialog 
        open={showRegister} 
        onOpenChange={setShowRegister} 
      />
      
      <LoginDialog 
        open={showLogin} 
        onOpenChange={setShowLogin} 
      />
    </div>
  );
};

export default GuestPayment;