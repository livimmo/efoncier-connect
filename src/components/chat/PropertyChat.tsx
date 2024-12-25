import { useState } from 'react';
import { Button } from '../ui/button';
import { MessageSquare, X } from 'lucide-react';

export interface PropertyChatProps {
  propertyId: string;
  onClose: () => void;
}

export const PropertyChat = ({ propertyId, onClose }: PropertyChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'system' }[]>([
    { text: "Bonjour, comment puis-je vous aider ?", sender: 'system' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    // Simulate system response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Je suis désolé, le chat n'est pas encore disponible. Veuillez réessayer plus tard.",
        sender: 'system'
      }]);
    }, 1000);
  };

  return (
    <div className={`fixed bottom-4 right-4 ${isOpen ? 'w-80' : 'w-auto'}`}>
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg flex flex-col h-[400px]">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Chat - Bien #{propertyId}</h3>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Écrivez votre message..."
                className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleSendMessage}>
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Chat
        </Button>
      )}
    </div>
  );
};