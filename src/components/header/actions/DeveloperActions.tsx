import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const DeveloperActions = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate("/map")}
      className="relative"
    >
      <Map className="h-5 w-5" />
    </Button>
  );
};