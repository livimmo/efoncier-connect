import { Property } from "@/types";

export interface PropertiesStatsProps {
  data: Property[];
}

export const PropertiesStats = ({ data }: PropertiesStatsProps) => {
  const totalProperties = data.length;
  const compliantProperties = data.filter(property => property.fiscal_status === "compliant").length;
  const nonCompliantProperties = data.filter(property => property.fiscal_status === "non_compliant").length;
  const underReviewProperties = data.filter(property => property.fiscal_status === "under_review").length;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">Total Biens</h3>
        <p className="text-2xl">{totalProperties}</p>
      </div>
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">Conformes</h3>
        <p className="text-2xl">{compliantProperties}</p>
      </div>
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">Non Conformes</h3>
        <p className="text-2xl">{nonCompliantProperties}</p>
      </div>
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">En Révision</h3>
        <p className="text-2xl">{underReviewProperties}</p>
      </div>
    </div>
  );
};