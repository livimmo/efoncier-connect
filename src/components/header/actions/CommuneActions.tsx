import { BarChart2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CommuneActions = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/stats")}
        className="relative"
      >
        <BarChart2 className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/fiscal")}
        className="relative"
      >
        <Shield className="h-5 w-5" />
      </Button>
    </>
  );
};