import { Header } from "@/components/Header";
import { SettingsLayout } from "@/components/settings/SettingsLayout";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <SettingsLayout />
      </main>
    </div>
  );
};

export default Settings;