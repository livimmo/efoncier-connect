import { useNavigate } from "react-router-dom";

export const useChatNavigation = () => {
  const navigate = useNavigate();

  const handleUserAction = (action: string, data?: any) => {
    switch (action) {
      case "search_properties":
        navigate("/search");
        break;
      case "manage_properties":
        navigate("/dashboard?tab=properties");
        break;
      case "make_payment":
        navigate("/payment");
        break;
      case "view_messages":
        navigate("/messages");
        break;
      case "view_settings":
        navigate("/profile/settings");
        break;
      case "get_help":
        navigate("/support");
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  return { handleUserAction };
};