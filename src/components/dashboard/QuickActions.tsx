import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, FileText, MapPin, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Actions Rapides</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-4"
          onClick={() => navigate("/")}
        >
          <MapPin className="h-5 w-5" />
          <span>Carte Interactive</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-4"
          onClick={() => navigate("/dashboard?tab=payments")}
        >
          <CreditCard className="h-5 w-5" />
          <span>Payer une Taxe</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-4"
          onClick={() => navigate("/dashboard?tab=messages")}
        >
          <MessageSquare className="h-5 w-5" />
          <span>Messages</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-4"
          onClick={() => navigate("/dashboard?tab=reports")}
        >
          <FileText className="h-5 w-5" />
          <span>Rapports</span>
        </Button>
      </div>
    </Card>
  );
};