import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MapPin, Info, ArrowRight, MessageSquare, Share } from "lucide-react";

interface NewsListProps {
  searchQuery: string;
  selectedCategory: string;
  selectedRegion: string;
  selectedDate: Date | undefined;
  layout: "grid" | "list";
}

const mockNews = [
  {
    id: 1,
    date: "2024-06-01",
    title: "Date Limite pour le Paiement de la TNB Approche !",
    type: "alert",
    summary: "Les propriétaires de terrains doivent régulariser leur situation avant le 30 juin.",
    region: "rabat",
    comments: 5,
  },
  {
    id: 2,
    date: "2024-06-05",
    title: "Nouveaux Terrains Disponibles dans la Zone Industrielle de Rabat",
    type: "announcement",
    summary: "Découvrez les dernières opportunités d'investissement disponibles.",
    region: "rabat",
    comments: 3,
  },
  {
    id: 3,
    date: "2024-06-07",
    title: "Mise à Jour de la Politique de Sécurité des Données sur eFoncier",
    type: "update",
    summary: "Découvrez les nouvelles mesures de sécurité pour vos informations personnelles.",
    region: "casablanca",
    comments: 8,
  },
];

export const NewsList = ({ layout, searchQuery, selectedCategory, selectedRegion, selectedDate }: NewsListProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <Bell className="w-4 h-4 text-destructive" />;
      case "announcement":
        return <MapPin className="w-4 h-4 text-secondary" />;
      case "update":
        return <Info className="w-4 h-4 text-primary" />;
      default:
        return null;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "alert":
        return "destructive";
      case "announcement":
        return "secondary";
      case "update":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div className={`grid gap-6 ${layout === "grid" ? "md:grid-cols-3" : "grid-cols-1"}`}>
      {mockNews.map((news) => (
        <Card key={news.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant={getTypeBadgeVariant(news.type) as any} className="flex items-center gap-1">
                {getTypeIcon(news.type)}
                {news.type.charAt(0).toUpperCase() + news.type.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground">{news.date}</span>
            </div>
            <CardTitle className="mt-2">{news.title}</CardTitle>
            <CardDescription>{news.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {news.region.charAt(0).toUpperCase() + news.region.slice(1)}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageSquare className="w-4 h-4" />
                {news.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>
            <Button size="sm" className="gap-1">
              Lire Plus
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};