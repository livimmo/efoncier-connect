import { Header } from "@/components/Header";
import { Footer } from "@/components/home/Footer";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  hideFooter?: boolean;
}

export const MainLayout = ({ children, className = "", hideFooter = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};