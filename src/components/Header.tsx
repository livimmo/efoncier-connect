import { Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MainNav } from "./MainNav";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src="/logo.svg" alt="eFoncier" className="h-8 w-auto" />
          </Link>
          <span className="text-xl font-semibold text-primary">eFoncier</span>
        </div>
        
        <MainNav />
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};