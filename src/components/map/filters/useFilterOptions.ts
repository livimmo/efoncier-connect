import { useMemo } from 'react';
import { PROPERTY_TYPES, ZONE_TYPES } from './constants';
import { REGIONS } from '@/utils/mockData/locations';
import { mockParcels } from '@/utils/mockData/parcels';

export const useFilterOptions = (selectedRegion: string) => {
  const propertyTypeOptions = useMemo(() => 
    Object.entries(PROPERTY_TYPES).map(([value, label]) => ({
      value,
      label
    })), []
  );

  const zoneTypeOptions = useMemo(() => 
    Object.entries(ZONE_TYPES).map(([value, label]) => ({
      value,
      label
    })), []
  );

  const availableCommunes = useMemo(() => {
    if (!selectedRegion) return [];
    const region = REGIONS.find(r => r.id === selectedRegion);
    return region ? region.communes : [];
  }, [selectedRegion]);

  const statusCounts = useMemo(() => {
    const counts = {
      PAID: 0,
      PENDING: 0,
      OVERDUE: 0
    };
    
    mockParcels.forEach(parcel => {
      if (parcel.taxStatus === 'PAID') counts.PAID++;
      else if (parcel.taxStatus === 'PENDING') counts.PENDING++;
      else if (parcel.taxStatus === 'OVERDUE') counts.OVERDUE++;
    });
    
    return counts;
  }, []);

  const statusOptions = useMemo(() => [
    { value: "ALL", label: "Tous les statuts" },
    { value: "PAID", label: `Payé (${statusCounts.PAID})` },
    { value: "PENDING", label: `En attente (${statusCounts.PENDING})` },
    { value: "OVERDUE", label: `En retard (${statusCounts.OVERDUE})` }
  ], [statusCounts]);

  return {
    propertyTypeOptions,
    zoneTypeOptions,
    availableCommunes,
    statusOptions,
    statusCounts
  };
};