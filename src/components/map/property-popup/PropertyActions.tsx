import { Button } from "@/components/ui/button";
import { CreditCard, Share2, MessageSquare } from "lucide-react";
import { Parcel } from "@/utils/mockData/types";
import { cn } from "@/lib/utils";

interface PropertyActionsProps {
  parcel: Parcel;
  className?: string;
}

export function PropertyActions({ parcel, className }: PropertyActionsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Button className="flex-1">
        <CreditCard className="mr-2 h-4 w-4" />
        Payer la TNB
      </Button>
      <Button variant="outline" className="flex-1">
        <MessageSquare className="mr-2 h-4 w-4" />
        Contacter
      </Button>
      <Button variant="outline" size="icon">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}