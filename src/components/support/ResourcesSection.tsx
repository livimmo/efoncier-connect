import { Button } from "@/components/ui/button";
import { FileDown, Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const documents = [
  { title: "Guide Utilisateur", icon: FileDown },
  { title: "Manuel de la Carte Interactive", icon: FileDown },
  { title: "Instructions de Paiement", icon: FileDown },
  { title: "Politique de Confidentialité", icon: FileDown },
];

const videos = [
  { title: "Comment payer ma TNB en ligne ?", icon: Video },
  { title: "Comment consulter les informations d'un terrain ?", icon: Video },
  { title: "Comment gérer vos paramètres de compte ?", icon: Video },
];

export const ResourcesSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ressources et Documents Utiles</CardTitle>
        <CardDescription>
          Guides, manuels et tutoriels vidéo pour vous aider
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Documentation</h3>
            <div className="grid grid-cols-1 gap-2">
              {documents.map((doc) => (
                <Button
                  key={doc.title}
                  variant="outline"
                  className="justify-start w-full"
                >
                  <doc.icon className="mr-2 h-4 w-4" />
                  {doc.title}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Tutoriels Vidéo</h3>
            <div className="grid grid-cols-1 gap-2">
              {videos.map((video) => (
                <Button
                  key={video.title}
                  variant="outline"
                  className="justify-start w-full"
                >
                  <video.icon className="mr-2 h-4 w-4" />
                  {video.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};