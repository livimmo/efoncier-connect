import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/home/HeroSlider";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { KeyFeaturesSection } from "@/components/home/KeyFeaturesSection";
import { VideoSection } from "@/components/home/VideoSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <FeaturesSection />
        <KeyFeaturesSection />
        <VideoSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;