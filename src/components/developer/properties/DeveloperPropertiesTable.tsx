import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { mockParcels } from '@/utils/mockData/parcels';
import { PropertyChat } from '@/components/chat/PropertyChat';
import type { Parcel } from '@/utils/mockData/types';

interface DeveloperPropertiesTableProps {
  data?: Parcel[];
}

const DeveloperPropertiesTable = ({ data = mockParcels }: DeveloperPropertiesTableProps) => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} />
      {selectedParcel && (
        <PropertyChat 
          onClose={() => setSelectedParcel(null)}
          propertyId={selectedParcel.id}
        />
      )}
    </div>
  );
};

export default DeveloperPropertiesTable;