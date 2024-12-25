import { useAuth } from "@/components/auth/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { SettingsSidebar } from "./SettingsSidebar";
import { PersonalSettings } from "./sections/PersonalSettings";
import { SecuritySettings } from "./sections/SecuritySettings";
import { NotificationSettings } from "./sections/NotificationSettings";
import { AdvancedSettings } from "./sections/AdvancedSettings";
import { useState } from "react";

type SettingsSection = "personal" | "security" | "notifications" | "advanced";

export const SettingsLayout = () => {
  const { profile } = useAuth();
  const [currentSection, setCurrentSection] = useState<SettingsSection>("personal");

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres du Compte</h1>
          <p className="text-muted-foreground">
            Personnalisez vos préférences et informations personnelles.
          </p>
        </div>
        <Separator />
        
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <SettingsSidebar 
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
              userRole={profile?.role}
            />
          </aside>
          
          <main className="flex-1">
            {currentSection === "personal" && <PersonalSettings />}
            {currentSection === "security" && <SecuritySettings />}
            {currentSection === "notifications" && <NotificationSettings />}
            {currentSection === "advanced" && <AdvancedSettings />}
          </main>
        </div>
      </div>
    </div>
  );
};