import { Header } from "@/components/Header";
import { SettingsLayout } from "@/components/settings/SettingsLayout";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-8 mt-16">
        <SettingsLayout />
      </main>
    </div>
  );
};

export default Settings;