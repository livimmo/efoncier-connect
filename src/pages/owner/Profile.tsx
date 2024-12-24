import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Mail, Phone, Download, MessageSquare, MapPin, 
  CreditCard, Bell, FileText, Edit, Shield 
} from "lucide-react";
import { ParcelList } from "@/components/owner/ParcelList";
import { PaymentHistory } from "@/components/owner/PaymentHistory";
import { NotificationList } from "@/components/owner/NotificationList";

const TaxpayerProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 pt-24 space-y-6">
        {/* En-tête du profil */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt="Ahmed El Fassi" />
              <AvatarFallback>AE</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Ahmed El Fassi</h1>
              <p className="text-muted-foreground">ID: #C123456</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="success">Actif</Badge>
                <span className="text-sm text-muted-foreground">
                  Dernière connexion: 15/06/2024, 14h30
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Envoyer un message
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le dossier
            </Button>
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>ahmed.elfassi@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>+212 6 12 34 56 78</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>123, Avenue Mohamed V, Casablanca</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>CIN: AB123456</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Edit className="w-4 h-4 mr-2" />
                Modifier Profil
              </Button>
              <Button variant="outline" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Payer
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </Button>
              <Button variant="outline" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Sécurité
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Onglets d'information */}
        <Tabs defaultValue="parcels" className="w-full">
          <TabsList>
            <TabsTrigger value="parcels">Parcelles</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="parcels">
            <ParcelList />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentHistory />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TaxpayerProfile;
