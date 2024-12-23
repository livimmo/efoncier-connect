import { Header } from "@/components/Header";
import { MessagesContainer } from "@/components/messages/MessagesContainer";
import { Toaster } from "@/components/ui/toaster";

const Messages = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 mt-16 md:mt-20">
        <MessagesContainer />
      </main>
      <Toaster />
    </div>
  );
};

export default Messages;