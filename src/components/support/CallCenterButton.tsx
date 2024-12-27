import { useState } from "react";
import { Headset, Phone, Mail, MessageSquare, Bot, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ChatWindow } from "../chat/ChatWindow";
import { AgentContactButton } from "./AgentContactButton";

interface CallCenterButtonProps {
  variant?: "header" | "floating";
  className?: string;
}

export const CallCenterButton = ({ variant = "floating", className }: CallCenterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();
  const isAgentAvailable = true;

  const handleEmailSupport = () => {
    window.location.href = "mailto:support@efoncier.ma";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "header" ? "icon" : "lg"}
          className={cn(
            variant === "floating" && "fixed bottom-20 right-4 z-50 rounded-full shadow-lg",
            "group relative",
            className
          )}
        >
          <div className="relative">
            <Headset className="h-5 w-5" />
            {isAgentAvailable && (
              <Badge 
                variant="default" 
                className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-green-500 p-0 border-2 border-background"
              />
            )}
          </div>
          {variant === "floating" && (
            <span className="hidden group-hover:inline-block ml-2">
              Support Client
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {!showChat ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Headset className="h-5 w-5 text-primary" />
                Contactez notre support client
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {isAgentAvailable ? (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <Badge variant="default" className="h-2 w-2 rounded-full bg-green-500 p-0" />
                  Nos agents sont disponibles pour vous aider
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tous nos agents sont actuellement occupés
                </p>
              )}

              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="default" 
                  className="w-full justify-start gap-2"
                  onClick={() => setShowChat(true)}
                >
                  <Bot className="h-4 w-4" />
                  Parler avec l'assistant virtuel
                </Button>

                <AgentContactButton variant="inline" className="w-full" />

                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleEmailSupport}
                >
                  <Mail className="h-4 w-4" />
                  Envoyer un email
                  <span className="ml-auto text-xs text-muted-foreground">
                    support@efoncier.ma
                  </span>
                </Button>
              </div>
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