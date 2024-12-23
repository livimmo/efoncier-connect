import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src="/logo.svg" alt="eFoncier" className="h-8 w-8" />
      <span className="font-bold text-xl">eFoncier</span>
    </Link>
  );
};