import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { MobileFooter } from "@/components/mobile/MobileFooter";

// Public Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Directory from "./pages/Directory"; // New import for Directory

// Authenticated Pages
import Dashboard from "./pages/Dashboard";
import TaxpayerDashboard from "./pages/taxpayer/Dashboard";
import DeveloperDashboard from "./pages/developer/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="efoncier-theme">
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/directory" element={<Directory />} /> {/* New route for Directory */}
              
              {/* Authenticated Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/taxpayer/*" element={<TaxpayerDashboard />} />
              <Route path="/developer/*" element={<DeveloperDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
            <ChatBubble />
            <MobileFooter />
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
