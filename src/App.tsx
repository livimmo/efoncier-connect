import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AppRoutes } from "@/components/AppRoutes";
import { CallCenterButton } from "@/components/support/CallCenterButton";
import { useMediaQuery } from "@/hooks/use-media-query";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="efoncier-theme">
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <AppRoutes />
              <ChatBubble />
              {!isMobile && <CallCenterButton />}
              <MobileFooter />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;