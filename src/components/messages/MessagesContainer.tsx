import { useState } from "react";
import { MessagesHeader } from "./MessagesHeader";
import { MessagesSearch } from "./MessagesSearch";
import { MessagesList } from "./MessagesList";
import { MessageDetail } from "./MessageDetail";

export const MessagesContainer = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <MessagesHeader />
      <div className="mt-6">
        <MessagesSearch />
      </div>
      <div className="mt-6 flex gap-6">
        <div className={`${selectedConversation ? 'hidden md:block w-1/3' : 'w-full'}`}>
          <MessagesList 
            onSelectConversation={setSelectedConversation}
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