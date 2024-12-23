import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Facebook, MessageCircle } from "lucide-react";

interface SocialLoginButtonsProps {
  isLoading: boolean;
  onWhatsAppLogin: () => void;
}

export const SocialLoginButtons = ({ isLoading, onWhatsAppLogin }: SocialLoginButtonsProps) => {
  return (
    <div className="grid gap-2">
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={onWhatsAppLogin}
        className={cn(
          "bg-[#25D366] text-white hover:bg-[#25D366]/90",
          "dark:hover:bg-[#25D366]/70"
        )}
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        WhatsApp
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className={cn(
          "bg-[#4267B2] text-white hover:bg-[#4267B2]/90",
          "dark:hover:bg-[#4267B2]/70"
        )}
      >
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
    </div>
  );
};