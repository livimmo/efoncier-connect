import { Parcel } from '@/utils/mockData/types';
import { UserRole } from '@/types/auth';

export interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  onMinimize?: () => void;
  userRole?: UserRole;
}

export const ParcelInfo = ({ parcel, onClose, onMinimize, userRole }: ParcelInfoProps) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">{parcel.title}</h2>
      <p>{parcel.description}</p>
      <div className="mt-4">
        <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded">Close</button>
        {onMinimize && (
          <button onClick={onMinimize} className="bg-gray-500 text-white py-2 px-4 rounded ml-2">Minimize</button>
        )}
      </div>
    </div>
  );
};
