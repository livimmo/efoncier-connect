import { Header } from "@/components/Header";

const CommuneProperties = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 space-y-6 pt-24">
        <h1 className="text-3xl font-bold">Biens de la Commune</h1>
        {/* Add commune properties content here */}
      </main>
    </div>
  );
};

export default CommuneProperties;