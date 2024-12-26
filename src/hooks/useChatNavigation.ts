import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";

export const useChatNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUserAction = (action: string, data?: any) => {
    switch (action) {
      case "view_documents":
        navigate("/documents");
        break;
      case "make_payment":
        navigate("/payment");
        break;
      case "locate_properties":
        navigate("/map");
        break;
      case "view_notifications":
        navigate("/notifications");
        break;
      case "view_available_properties":
        navigate("/developer/properties");
        break;
      case "view_favorites":
        navigate("/developer/favorites");
        break;
      case "view_pending_payments":
        navigate("/commune/payments");
        break;
      case "generate_report":
        navigate("/commune/reports");
        break;
      case "manage_properties":
        navigate("/commune/properties");
        break;
      case "register":
        navigate("/register");
        break;
      case "contact_support":
        toast({
          title: "Support",
          description: "Un agent va prendre en charge votre demande dans quelques instants...",
        });
        break;
      case "view_map":
        navigate("/map");
        break;
      case "filter_results":
        navigate("/search");
        break;
      case "payment_history":
        navigate("/history");
        break;
      case "view_faq":
        navigate("/support");
        break;
      case "create_ticket":
        navigate("/support?action=create-ticket");
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  return { handleUserAction };
};