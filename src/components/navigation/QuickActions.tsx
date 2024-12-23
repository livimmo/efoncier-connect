import { Link } from "react-router-dom";
import { Bell, MessageSquare, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  hasNotifications?: boolean;
  hasMessages?: boolean;
  hasPendingPayments?: boolean;
}

export function QuickActions({
  hasNotifications = false,
  hasMessages = false,
  hasPendingPayments = false
}: QuickActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="relative"
      >
        <Link to="/messages">
          <MessageSquare className="h-5 w-5" />
          {hasMessages && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </Link>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        asChild
        className="relative"
      >
        <Link to="/notifications">
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </Link>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        asChild
        className={cn("relative", hasPendingPayments && "animate-pulse")}
      >
        <Link to="/payment">
          <CreditCard className="h-5 w-5" />
          {hasPendingPayments && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </Link>
      </Button>
    </div>
  );
}