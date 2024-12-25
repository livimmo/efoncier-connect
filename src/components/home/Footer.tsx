import { Facebook, Instagram, Twitter, Linkedin, ArrowUp, Contact } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Navigation Rapide */}
          <div>
            <h3 className="font-semibold mb-4">Navigation Rapide</h3>
            <ul className="space-y-2">
              <li><Link to="/map" className="hover:text-primary transition-colors">Carte Interactive</Link></li>
              <li><Link to="/payment" className="hover:text-primary transition-colors">Paiements</Link></li>
              <li><Link to="/history" className="hover:text-primary transition-colors">Historique</Link></li>
              <li><Link to="/notifications" className="hover:text-primary transition-colors">Notifications</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">Support & FAQ</Link></li>
            </ul>
          </div>

          {/* Liens Utiles */}
          <div>
            <h3 className="font-semibold mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary transition-colors">À Propos de eFoncier</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                <Contact className="h-4 w-4" />
                Contact
              </Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Conditions d'Utilisation</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Politique de Confidentialité</Link></li>
              <li><Link to="/legal" className="hover:text-primary transition-colors">Mentions Légales</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Rue Al Mouqawama, Casablanca</li>
              <li>Email: support@efoncier.ma</li>
              <li>Tél: +212 5 00 00 00 00</li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div>
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright et Retour en Haut */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 eFoncier. Tous droits réservés.
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="hover:scale-110 transition-transform"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};