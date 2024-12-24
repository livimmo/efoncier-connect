import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PartnersCarouselProps {
  compact?: boolean;
}

const partners = [
  {
    id: 1,
    name: "Direction Générale des Impôts",
    logo: "/lovable-uploads/a97b9ec9-33bc-4f61-b8f8-0056bffd075d.png",
    description: "Administration fiscale du Royaume du Maroc",
    link: "https://portail.tax.gov.ma",
  },
  {
    id: 2,
    name: "ANCFCC",
    logo: "/lovable-uploads/08aeeb64-02d8-4d13-83dc-f4a3f650387f.png",
    description: "Agence Nationale de la Conservation Foncière",
    link: "https://www.ancfcc.gov.ma",
  },
  {
    id: 3,
    name: "Attijariwafa Bank",
    logo: "/lovable-uploads/4c9d35a9-6771-4476-bd7d-b16fb9de1704.png",
    description: "Taux préférentiels pour terrains",
    link: "https://www.attijariwafabank.com",
  },
  {
    id: 4,
    name: "Al Omrane",
    logo: "/partners/alomrane.png",
    description: "Investissez dès maintenant",
    link: "#",
  },
];

export const PartnersCarousel = ({ compact = false }: PartnersCarouselProps) => {
  if (compact) {
    return (
      <div className="py-2">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {partners.map((partner) => (
              <CarouselItem key={partner.id} className="basis-1/3">
                <div className="h-12 relative p-1">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="object-contain w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Nos Partenaires Institutionnels 🏛️</h2>
        <p className="text-muted-foreground">
          Les institutions officielles et partenaires privilégiés du service eFoncier
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {partners.map((partner) => (
            <CarouselItem key={partner.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="border-2">
                <CardContent className="flex flex-col items-center justify-between p-6">
                  <div className="aspect-square w-full relative mb-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="font-semibold">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {partner.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Visiter le site
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};