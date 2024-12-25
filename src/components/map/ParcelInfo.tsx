import { Parcel } from "@/utils/mockData/types";
import { UserRole } from "@/types/auth";

export interface ParcelInfoProps {
  parcel: Parcel;
  onClose: () => void;
  className?: string;
  userRole: UserRole;
}

export const ParcelInfo = ({ parcel, onClose, className, userRole }: ParcelInfoProps) => {
  return (
    <div className={`parcel-info ${className}`}>
      <button onClick={onClose} className="close-button">X</button>
      <h2>{parcel.titleDeedNumber}</h2>
      <p>Localisation: {parcel.address}</p>
      <p>Superficie: {parcel.surface} m²</p>
      <p>Prix: {parcel.price} DHS</p>
      <p>Statut: {parcel.status}</p>
      <p className="whitespace-nowrap">Statut Fiscal: {parcel.taxStatus}</p>
      {userRole === "owner" && (
        <div>
          <button onClick={() => console.log("Contact Owner")}>Contacter le Propriétaire</button>
        </div>
      )}
      {userRole === "developer" && (
        <div>
          <button onClick={() => console.log("View Details")}>Voir Détails</button>
        </div>
      )}
    </div>
  );
};