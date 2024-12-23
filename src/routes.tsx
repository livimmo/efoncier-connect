import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Directory from "./pages/Directory";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Payment from "./pages/Payment";
import Privacy from "./pages/Privacy";
import Receipt from "./pages/Receipt";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Support from "./pages/Support";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/directory",
    element: <Directory />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/receipt",
    element: <Receipt />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/support",
    element: <Support />,
  },
]);