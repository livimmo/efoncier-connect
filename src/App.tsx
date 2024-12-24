import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { useAuth } from "@/components/auth/AuthProvider";

// Public Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Directory from "./pages/Directory";
import Messages from "./pages/Messages";
import Support from "./pages/Support";
import Map from "./components/Map";
import Login from "./pages/Login";
import History from "./pages/History";

// Authenticated Pages
import Dashboard from "./pages/Dashboard";
import TaxpayerDashboard from "./pages/taxpayer/Dashboard";
import DeveloperDashboard from "./pages/developer/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="efoncier-theme">
        <AuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/notifications" element={
                  <ProtectedRoute><Notifications /></ProtectedRoute>
                } />
                <Route path="/payment" element={
                  <ProtectedRoute><Payment /></ProtectedRoute>
                } />
                <Route path="/directory" element={
                  <ProtectedRoute><Directory /></ProtectedRoute>
                } />
                <Route path="/messages" element={
                  <ProtectedRoute><Messages /></ProtectedRoute>
                } />
                <Route path="/support" element={
                  <ProtectedRoute><Support /></ProtectedRoute>
                } />
                <Route path="/history" element={
                  <ProtectedRoute><History /></ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/taxpayer/*" element={
                  <ProtectedRoute><TaxpayerDashboard /></ProtectedRoute>
                } />
                <Route path="/developer/*" element={
                  <ProtectedRoute><DeveloperDashboard /></ProtectedRoute>
                } />
                <Route path="/admin/*" element={
                  <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                } />

                {/* Catch all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <ChatBubble />
              <MobileFooter />
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;