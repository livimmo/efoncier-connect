import { Header } from "@/components/Header";
import { ContactForm } from "@/components/support/ContactForm";
import { FAQSection } from "@/components/support/FAQSection";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-4 md:p-8 mt-16">
        {/* En-tête de la page */}
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">📞 Contactez-nous</h1>
            <p className="text-muted-foreground">
              Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans vos démarches.
            </p>
            <p className="text-sm text-muted-foreground">
              Notre équipe est à votre écoute du lundi au vendredi, de 8h à 18h et le samedi de 9h à 13h.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations de contact */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Informations de Contact</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contact@efoncier.ma</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-sm text-muted-foreground">+212 5 22 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-sm text-muted-foreground">123, Boulevard Mohammed V, Casablanca, Maroc</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Horaires d'ouverture</p>
                      <p className="text-sm text-muted-foreground">
                        Lundi – Vendredi : 8h – 18h<br />
                        Samedi : 9h – 13h
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Carte Google Maps */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Notre Localisation</h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846547126776!2d-7.6192!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d282e981f8df%3A0x3488829b8de1177b!2sBoulevard%20Mohammed%20V%2C%20Casablanca%2C%20Maroc!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>

              {/* FAQ Section */}
              <FAQSection />
            </div>

            {/* Formulaire de contact */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      
      {/* Chatbot flottant */}
      <ChatBubble />
    </div>
  );
};

export default Contact;