import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 bg-accent/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Découvrez eFoncier en Vidéo
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Regardez comment eFoncier transforme la gestion foncière au Maroc
        </p>

        <div className="relative max-w-4xl mx-auto aspect-video bg-muted rounded-lg overflow-hidden group cursor-pointer"
             onClick={() => setIsOpen(true)}>
          {/* Thumbnail from YouTube */}
          <img 
            src="https://i3.ytimg.com/vi/6VO7nSkYBJU/maxresdefault.jpg" 
            alt="Video thumbnail" 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/40 transition-colors">
            <Button 
              size="lg"
              className="rounded-full w-16 h-16 p-0 group-hover:scale-110 transition-transform"
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-4xl p-0">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/6VO7nSkYBJU"
                title="eFoncier Présentation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};