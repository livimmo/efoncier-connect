import { useState } from "react";
import { Header } from "@/components/Header";
import { NotificationsHeader } from "./NotificationsHeader";
import { NotificationsContent } from "./NotificationsContent";
import type { NotificationFilter } from "@/types/notifications";

const NotificationsPage = () => {
  const [filters, setFilters] = useState<NotificationFilter>({
    type: "all",
    status: "all",
    date: null,
    location: "all",
    search: "",
    priority: "all"
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