import { useState } from "react";
import { Header } from "@/components/Header";
import { NotificationsHeader } from "@/components/notifications/NotificationsHeader";
import { NotificationsContent } from "@/components/notifications/NotificationsContent";
import type { NotificationFilter } from "@/types/notifications";

const NotificationsPage = () => {
  const [filters, setFilters] = useState<NotificationFilter>({
    status: "all",
    type: "all",
    priority: "all",
    date: null,
    location: "all",
    search: "",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <NotificationsHeader />
          <NotificationsContent 
            filters={filters} 
            onFiltersChange={setFilters} 
          />
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;