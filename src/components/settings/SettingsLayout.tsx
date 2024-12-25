import { useState } from "react";
import { PersonalSettings } from "./sections/PersonalSettings";
import { SecuritySettings } from "./sections/SecuritySettings";
import { NotificationSettings } from "./sections/NotificationSettings";
import { AdvancedSettings } from "./sections/AdvancedSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SettingsSection = "personal" | "security" | "notifications" | "advanced";

export const SettingsLayout = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>("personal");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
      
      <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as SettingsSection)}>
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Profil Personnel</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalSettings />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="advanced">
          <AdvancedSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};