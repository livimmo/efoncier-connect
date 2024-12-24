import { Property } from "@/utils/mockData/types";

interface PropertiesStatsProps {
  data: Property[];
}

export const PropertiesStats = ({ data }: PropertiesStatsProps) => {
  const totalProperties = data.length;
  const compliantProperties = data.filter(property => property.fiscal_status === "compliant").length;
  const nonCompliantProperties = data.filter(property => property.fiscal_status === "non_compliant").length;
  const underReviewProperties = data.filter(property => property.fiscal_status === "under_review").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">Total Properties</h3>
        <p className="text-2xl">{totalProperties}</p>
      </div>
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">Compliant</h3>
        <p className="text-2xl">{compliantProperties}</p>
      </div>
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">Non-Compliant</h3>
        <p className="text-2xl">{nonCompliantProperties}</p>
      </div>
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">Under Review</h3>
        <p className="text-2xl">{underReviewProperties}</p>
      </div>
    </div>
  );
};
