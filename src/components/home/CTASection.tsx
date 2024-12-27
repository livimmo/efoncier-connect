import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChatWindow } from "@/components/chat/ChatWindow";

export const CTASection = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Prêt à Transformer Votre Gestion Fiscale et Foncier ?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="group hover:scale-105 transition-transform"
          >
            <Link to="/register">
              Créer un Compte Gratuitement
            </Link>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="group hover:scale-105 transition-transform bg-white text-primary hover:bg-gray-100 hover:text-primary border-primary"
            onClick={() => setShowChat(true)}
          >
            <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Parler à un Conseiller
          </Button>
        </div>
      </div>

      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="sm:max-w-[425px] p-0">
          <ChatWindow onClose={() => setShowChat(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};