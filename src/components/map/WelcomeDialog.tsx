import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Search, MapPin, Bell } from "lucide-react";

export const WelcomeDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenMapWelcome");
    if (!hasSeenWelcome) {
      setShowDialog(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hasSeenMapWelcome", "true");
    }
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Bienvenue sur la Carte Interactive eFoncier 🗺️
          </DialogTitle>
          <DialogDescription className="text-center text-lg mt-4">
            Explorez les parcelles disponibles, appliquez des filtres avancés et
            réalisez vos transactions en toute simplicité.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Search className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Filtres Dynamiques</h4>
                <p className="text-sm text-muted-foreground">
                  Affinez vos recherches par ville, type de terrain et prix
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Localisation Précise</h4>
                <p className="text-sm text-muted-foreground">
                  Identifiez facilement les parcelles sur la carte
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Bell className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Notifications en Temps Réel</h4>
                <p className="text-sm text-muted-foreground">
                  Soyez alerté des nouvelles opportunités
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dontShow"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            />
            <label
              htmlFor="dontShow"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ne plus afficher ce message
            </label>
          </div>
          <div className="flex justify-center gap-4 w-full">
            <Button onClick={handleClose} className="w-full">
              Accéder à la Carte Interactive
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};