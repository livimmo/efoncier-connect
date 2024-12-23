import { Button } from "@/components/ui/button";
import { MessageSquare, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const CommunitySection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Espace Communauté</CardTitle>
        <CardDescription>
          Échangez avec d'autres utilisateurs et partagez votre expérience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Forum d'Assistance</h3>
          <Button className="w-full" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Accéder au Forum
          </Button>
        </div>

        <div>
          <h3 className="font-medium mb-3">Évaluations et Feedback</h3>
          <div className="space-y-4">
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="sm"
                  className="p-0 hover:bg-transparent"
                >
                  <Star
                    className="h-6 w-6"
                    fill="currentColor"
                    stroke="none"
                  />
                </Button>
              ))}
            </div>
            <Textarea
              placeholder="Laissez un commentaire détaillé..."
              className="min-h-[100px]"
            />
            <Button className="w-full">
              Envoyer mon Feedback
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};