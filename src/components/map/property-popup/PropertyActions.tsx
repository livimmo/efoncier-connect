import { Button } from "@/components/ui/button";
import { CreditCard, Share2, MessageSquare, Receipt } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ContactDialog } from "../contact/ContactDialog";

interface PropertyActionsProps {
  parcel: Parcel;
  className?: string;
}

export function PropertyActions({ parcel, className }: PropertyActionsProps) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <div className={cn("flex flex-wrap gap-2", className)}>
        <Button className="flex-1">
          {parcel.taxStatus === 'PAID' ? (
            <>
              <Receipt className="mr-2 h-4 w-4" />
              Télécharger le reçu
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Payer la TNB
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setContactOpen(true)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Contacter
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      <ContactDialog
        parcel={parcel}
        open={contactOpen}
        onOpenChange={setContactOpen}
      />
    </>
  );
}