import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import PropertyLocationDialog from "./PropertyLocationDialog";
import PropertyDocumentsDialog from "./PropertyDocumentsDialog";
import { PropertyDetailsDialog } from "./PropertyDetailsDialog";

interface DeveloperPropertiesTableProps {
  data: Property[];
}

export const DeveloperPropertiesTable = ({ data }: DeveloperPropertiesTableProps) => {
  const { toast } = useToast();
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [openDocumentsDialog, setOpenDocumentsDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleLocationDialogOpen = (property: Property) => {
    setSelectedProperty(property);
    setOpenLocationDialog(true);
  };

  const handleDocumentsDialogOpen = (property: Property) => {
    setSelectedProperty(property);
    setOpenDocumentsDialog(true);
  };

  const handleDetailsDialogOpen = (property: Property) => {
    setSelectedProperty(property);
    setOpenDetailsDialog(true);
  };

  return (
    <div>
      <DataTable
        data={data}
        columns={[
          {
            accessorKey: "title",
            header: "Titre",
          },
          {
            accessorKey: "description",
            header: "Description",
          },
          {
            accessorKey: "price",
            header: "Prix",
          },
          {
            accessorKey: "status",
            header: "Statut",
          },
          {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
              <div className="flex space-x-2">
                <Button onClick={() => handleLocationDialogOpen(row.original)}>Localisation</Button>
                <Button onClick={() => handleDocumentsDialogOpen(row.original)}>Documents</Button>
                <Button onClick={() => handleDetailsDialogOpen(row.original)}>Détails</Button>
              </div>
            ),
          },
        ]}
      />

      {selectedProperty && (
        <>
          <PropertyLocationDialog
            property={selectedProperty}
            open={openLocationDialog}
            onOpenChange={setOpenLocationDialog}
          />
          <PropertyDocumentsDialog
            property={selectedProperty}
            open={openDocumentsDialog}
            onOpenChange={setOpenDocumentsDialog}
          />
          <PropertyDetailsDialog
            property={selectedProperty}
            open={openDetailsDialog}
            onOpenChange={setOpenDetailsDialog}
          />
        </>
      )}
    </div>
  );
};