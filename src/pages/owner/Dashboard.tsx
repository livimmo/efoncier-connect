import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Receipt, Map as MapIcon, Search, Settings } from "lucide-react";
import { PropertyStats } from "./components/PropertyStats";
import { PropertyMap } from "./components/PropertyMap";
import { PropertyList } from "@/pages/owner/components/PropertyList";
import { FiscalStatus } from "./components/FiscalStatus";
import { DocumentsList } from "./components/DocumentsList";
import { AlertsList } from "./components/AlertsList";
import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const OwnerDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddProperty = () => {
    navigate("/owner/properties/add");
  };

  const handlePayTaxes = () => {
    navigate("/payment");
  };

  const handleViewMap = () => {
    navigate("/map");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-4 space-y-6 pt-20">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Tableau de Bord - {profile?.first_name} {profile?.last_name}
            </h1>
            <p className="text-muted-foreground">
              Gérez vos biens et suivez vos paiements
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleAddProperty} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un Bien
            </Button>
            <Button onClick={handlePayTaxes} variant="outline" className="gap-2">
              <Receipt className="h-4 w-4" />
              Payer TNB
            </Button>
            <Button onClick={handleViewMap} variant="outline" className="gap-2">
              <MapIcon className="h-4 w-4" />
              Voir sur la Carte
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher par numéro TF, adresse, zoning..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Stats Overview */}
        <PropertyStats />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <Card className="lg:row-span-2">
            <PropertyMap />
          </Card>

          {/* Fiscal Status */}
          <Card>
            <FiscalStatus />
          </Card>

          {/* Properties List */}
          <Card>
            <PropertyList />
          </Card>
        </div>

        {/* Documents and Alerts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <DocumentsList />
          </Card>
          <Card>
            <AlertsList />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;