import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FAQSection } from "@/components/support/FAQSection";
import { ContactForm } from "@/components/support/ContactForm";
import { TicketTracker } from "@/components/support/TicketTracker";
import { ResourcesSection } from "@/components/support/ResourcesSection";
import { CommunitySection } from "@/components/support/CommunitySection";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 mt-16">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Centre d'Aide & Support – eFoncier</h1>
            <p className="text-muted-foreground mb-6">
              Trouvez des réponses rapides à vos questions ou contactez notre équipe d'assistance dédiée.
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Input
                type="search"
                placeholder="Recherchez un sujet ou une question..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <FAQSection />
              <ContactForm />
              <ResourcesSection />
            </div>
            <div className="space-y-8">
              <TicketTracker />
              <CommunitySection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;