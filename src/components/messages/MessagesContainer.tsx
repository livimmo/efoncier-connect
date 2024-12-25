import { useState } from "react";
import { MessagesHeader } from "./MessagesHeader";
import { MessagesSearch } from "./MessagesSearch";
import { MessageList } from "./MessagesList";
import { MessageDetail } from "./MessageDetail";
import { useToast } from "@/hooks/use-toast";

export const MessagesContainer = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    toast({
      title: "Conversation sélectionnée",
      description: "Chargement de la conversation...",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <MessagesHeader />
      <div className="mt-6">
        <MessagesSearch />
      </div>
      <div className="mt-6 flex gap-6">
        <div className={`${selectedConversation ? 'hidden md:block w-1/3' : 'w-full'}`}>
          <MessageList 
            onMessageSelect={handleSelectConversation}
            selectedConversationId={selectedConversation}
          />
        </div>
        {selectedConversation && (
          <div className="flex-1">
            <MessageDetail 
              conversationId={selectedConversation}
              onClose={() => setSelectedConversation(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};