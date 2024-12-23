import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Contactez-nous
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <Mail className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">contact@efoncier.gov.ma</p>
            </Card>
            
            <Card className="p-6">
              <Phone className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
              <p className="text-gray-600">+212 5XX-XXXXXX</p>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <Input placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="votre@email.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Sujet</label>
                <Input placeholder="Sujet de votre message" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea placeholder="Votre message" rows={6} />
              </div>
              
              <Button type="submit" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contact;