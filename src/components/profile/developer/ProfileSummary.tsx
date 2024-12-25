import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ProfileSummary() {
  const companyInfo = {
    companyName: "Entreprise Example",
    rcNumber: "RC123456",
    iceNumber: "123456789012345",
    address: "123 Rue Example, Ville",
  };

  const ownerInfo = {
    fullName: "John Doe",
    cin: "AB123456",
    cc: "123456789",
    commune: "Casablanca",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center justify-between">
          Récapitulatif du Profil
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Télécharger PDF
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🏢 Informations Entreprise</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Raison Sociale:</span> {companyInfo.companyName}</p>
              <p><span className="font-medium">RC:</span> {companyInfo.rcNumber}</p>
              <p><span className="font-medium">ICE:</span> {companyInfo.iceNumber}</p>
              <p><span className="font-medium">Adresse:</span> {companyInfo.address}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">👤 Informations Propriétaire</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Nom Complet:</span> {ownerInfo.fullName}</p>
              <p><span className="font-medium">CIN:</span> {ownerInfo.cin}</p>
              <p><span className="font-medium">CC:</span> {ownerInfo.cc}</p>
              <p><span className="font-medium">Commune:</span> {ownerInfo.commune}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}