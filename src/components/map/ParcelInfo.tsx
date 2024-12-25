import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/format";
import { MapPin, User, Ruler, CreditCard, FileText, Building } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';
import { useMediaQuery } from "@/hooks/use-media-query";
import { ParcelStatusBadges } from "./parcel-info/ParcelStatusBadges";

export interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole?: UserRole;
}

export const ParcelInfo = ({ parcel, onClose, className, userRole }: ParcelInfoProps) => {
  const { profile } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const isAuthenticated = !!profile;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleLoginClick = () => {
    setLoginOpen(true);
    onClose();
  };

  return (
    <>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <Card className={`overflow-hidden animate-fade-in ${className}`}>
        <ScrollArea className={`${isMobile ? 'max-h-[70vh]' : 'max-h-[600px]'} px-6 py-4`}>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{parcel.title}</h3>
              <ParcelStatusBadges 
                status={parcel.status}
                taxStatus={parcel.taxStatus}
                fiscalStatus={parcel.fiscalStatus}
              />
              <p className="text-sm text-muted-foreground">
                Référence: {parcel.titleDeedNumber}
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{parcel.address}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{parcel.ownerName}</span>
              </div>

              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{parcel.surface} m²</span>
              </div>

              {parcel.price && (
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-green-600">
                    Prix de vente: {formatCurrency(parcel.price)} DHS
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Statut Fiscal: {parcel.taxStatus}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Type: {parcel.type}</span>
              </div>
            </div>

            {isAuthenticated && (
              <div className="space-y-3 pt-4 border-t">
                {userRole === "owner" && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => console.log("Contact Owner")}
                  >
                    Contacter le Propriétaire
                  </Button>
                )}
                
                {userRole === "developer" && (
                  <Button 
                    variant="default"
                    className="w-full"
                    onClick={() => console.log("View Details")}
                  >
                    Voir les détails complets
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};