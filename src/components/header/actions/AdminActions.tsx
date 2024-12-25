import { Users, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AdminActions = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/users")}
        className="relative"
      >
        <Users className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/logs")}
        className="relative"
      >
        <Database className="h-5 w-5" />
      </Button>
    </>
  );
};