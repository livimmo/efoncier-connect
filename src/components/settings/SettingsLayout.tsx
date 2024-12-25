import { useState } from "react";
import { PersonalSettings } from "./sections/PersonalSettings";
import { SecuritySettings } from "./sections/SecuritySettings";
import { NotificationSettings } from "./sections/NotificationSettings";
import { AdvancedSettings } from "./sections/AdvancedSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth/AuthProvider";
import { User, Shield, Bell, Settings, Key, LogOut, History, Download, XCircle } from "lucide-react";

type SettingsSection = "personal" | "security" | "notifications" | "advanced" | "history" | "download" | "deactivate";

export const SettingsLayout = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>("personal");
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres de Configuration</h1>
        <p className="text-muted-foreground">
          Gérez vos préférences, vos informations personnelles et la sécurité de votre compte.
        </p>
      </div>
      
      <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as SettingsSection)} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Avancé</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden md:inline">Historique</span>
          </TabsTrigger>
          <TabsTrigger value="download" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Téléchargement</span>
          </TabsTrigger>
          <TabsTrigger value="deactivate" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span className="hidden md:inline">Désactiver</span>
          </TabsTrigger>
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