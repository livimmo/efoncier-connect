import { createBrowserRouter } from "react-router-dom";
import App from "./App";
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
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import TaxpayerDashboard from "./pages/taxpayer/Dashboard";
import DeveloperDashboard from "./pages/developer/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/register", element: <Register /> },
      { path: "/payment", element: <Payment /> },
      { path: "/directory", element: <Directory /> },
      { path: "/messages", element: <Messages /> },
      { path: "/support", element: <Support /> },
      { path: "/history", element: <History /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/taxpayer/*", element: <TaxpayerDashboard /> },
      { path: "/developer/*", element: <DeveloperDashboard /> },
      { path: "/admin/*", element: <AdminDashboard /> },
    ],
  },
]);