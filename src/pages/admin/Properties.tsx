import { Header } from "@/components/Header";

const AdminProperties = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 space-y-6 pt-24">
        <h1 className="text-3xl font-bold">Gestion des Biens - Admin</h1>
      </main>
    </div>
  );
};

export default AdminProperties;