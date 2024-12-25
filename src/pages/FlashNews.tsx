import { useState } from "react";
import { Header } from "@/components/Header";
import { NewsHeader } from "@/components/flash-news/NewsHeader";
import { NewsList } from "@/components/flash-news/NewsList";
import { NewsMarquee } from "@/components/flash-news/NewsMarquee";
import { NewsFilters } from "@/components/flash-news/NewsFilters";
import { useIsMobile } from "@/hooks/use-mobile";

const FlashNews = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <NewsHeader />
        <NewsMarquee />
        
        <div className="mt-8">
          <NewsFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <div className="mt-8">
          <NewsList
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedRegion={selectedRegion}
            selectedDate={selectedDate}
            layout={isMobile ? "list" : "grid"}
          />
        </div>
      </main>
    </div>
  );
};

export default FlashNews;