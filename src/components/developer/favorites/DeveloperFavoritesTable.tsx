import { useState } from "react";
import { Property } from "@/types";
import { PropertyChat } from "@/components/chat/PropertyChat";
import { PropertyDetailsDialog } from "../properties/PropertyDetailsDialog";
import PropertyDocumentsDialog from "../properties/PropertyDocumentsDialog";
import { useToast } from "@/hooks/use-toast";

interface DeveloperFavoritesTableProps {
  favorites: Property[];
}

export const DeveloperFavoritesTable = ({ favorites }: DeveloperFavoritesTableProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleDocumentsDialogOpen = () => {
    setDocumentsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propriétaire</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {favorites.map((property) => (
            <tr key={property.id}>
              <td className="px-6 py-4 whitespace-nowrap">{property.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{property.owner_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handlePropertySelect(property)}>Détails</button>
                <button onClick={handleDocumentsDialogOpen}>Documents</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProperty && (
        <PropertyDetailsDialog
          open={!!selectedProperty}
          onOpenChange={() => setSelectedProperty(null)}
          property={selectedProperty}
        />
      )}

      <PropertyDocumentsDialog
        open={documentsDialogOpen}
        onOpenChange={setDocumentsDialogOpen}
        property={selectedProperty!}
      />
    </div>
  );
};
