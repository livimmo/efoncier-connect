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

const partners = [
  {
    id: 1,
    name: "Attijariwafa Bank",
    logo: "/partners/attijariwafa.png",
    description: "Taux préférentiels pour terrains",
    link: "#",
  },
  {
    id: 2,
    name: "Al Omrane",
    logo: "/partners/alomrane.png",
    description: "Investissez dès maintenant",
    link: "#",
  },
  {
    id: 3,
    name: "Annonce Spéciale",
    logo: "/partners/special.png",
    description: "Consultez les dernières parcelles ajoutées",
    link: "#",
  },
];

export const PartnersCarousel = () => {
  return (
    <div className="py-10 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Nos Partenaires & Annonces 📢</h2>
        <p className="text-muted-foreground">
          Découvrez nos partenaires privilégiés et leurs offres spéciales
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
                        Voir l'offre
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