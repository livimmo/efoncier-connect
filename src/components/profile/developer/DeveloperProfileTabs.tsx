import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyInfoForm } from "./CompanyInfoForm";
import { OwnerInfoForm } from "./OwnerInfoForm";
import { ProfileSummary } from "./ProfileSummary";

export function DeveloperProfileTabs() {
  return (
    <Tabs defaultValue="company" className="w-full space-y-6">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="company">
          🏢 Informations Entreprise
        </TabsTrigger>
        <TabsTrigger value="owner">
          👤 Informations Propriétaire
        </TabsTrigger>
        <TabsTrigger value="summary">
          📋 Récapitulatif
        </TabsTrigger>
      </TabsList>

      <TabsContent value="company" className="space-y-4">
        <CompanyInfoForm />
      </TabsContent>

      <TabsContent value="owner" className="space-y-4">
        <OwnerInfoForm />
      </TabsContent>

      <TabsContent value="summary" className="space-y-4">
        <ProfileSummary />
      </TabsContent>
    </Tabs>
  );
}