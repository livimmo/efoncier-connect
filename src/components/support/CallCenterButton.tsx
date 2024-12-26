import { useState } from "react";
import { Bot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChatWindow } from "../chat/ChatWindow";
import { CallButton } from "./components/CallButton";
import { CallOptions } from "./components/CallOptions";

interface CallCenterButtonProps {
  variant?: "header" | "floating";
  className?: string;
}

export const CallCenterButton = ({ variant = "floating", className }: CallCenterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();
  const isAgentAvailable = true;

  const handleCall = () => {
    window.location.href = "tel:+212522123456";
  };

  const handleCallbackRequest = () => {
    toast({
      title: "Demande envoyée",
      description: "Un agent vous rappellera dans les plus brefs délais",
    });
    setPhoneNumber("");
    setIsOpen(false);
  };

  const handleEmailSupport = () => {
    window.location.href = "mailto:support@efoncier.ma";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CallButton
          variant={variant}
          className={className}
          isAgentAvailable={isAgentAvailable}
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {!showChat ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Contactez notre support client
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {isAgentAvailable ? (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Nos agents sont disponibles pour vous aider
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tous nos agents sont actuellement occupés
                </p>
              )}

              <CallOptions
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                onCall={handleCall}
                onEmailSupport={handleEmailSupport}
                onCallbackRequest={handleCallbackRequest}
                onChatStart={() => setShowChat(true)}
                isAgentAvailable={isAgentAvailable}
              />
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Assistant eFoncier
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                >
                  Retour
                </Button>
              </DialogTitle>
            </DialogHeader>
            <ChatWindow />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};