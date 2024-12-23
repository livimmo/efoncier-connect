import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";

// Authenticated Pages
import Dashboard from "./pages/Dashboard";
import TaxpayerDashboard from "./pages/taxpayer/Dashboard";
import DeveloperDashboard from "./pages/developer/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
            
            {/* Authenticated Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/taxpayer/*" element={<TaxpayerDashboard />} />
            <Route path="/developer/*" element={<DeveloperDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;