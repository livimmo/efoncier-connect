import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const NotificationsArea = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => navigate("/messages")}
      >
        <MessageSquare className="h-5 w-5" />
        <Badge 
          variant="default"
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
        >
          2
        </Badge>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => navigate("/notifications")}
      >
        <Bell className="h-5 w-5" />
        <Badge 
          variant="default"
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary"
        >
          3
        </Badge>
      </Button>
    </>
  );
};