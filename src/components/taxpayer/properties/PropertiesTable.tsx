import { Property } from "@/utils/mockData/types";

interface PropertiesTableProps {
  data: Property[];
  isLoading: boolean;
}

export const PropertiesTable = ({ data, isLoading }: PropertiesTableProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No properties found.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Fiscal Status</th>
          <th>Is For Sale</th>
          <th>Location</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((property) => (
          <tr key={property.id}>
            <td>{property.id}</td>
            <td>{property.description}</td>
            <td>{property.fiscal_status}</td>
            <td>{property.is_for_sale ? 'Yes' : 'No'}</td>
            <td>{JSON.stringify(property.location)}</td>
            <td>{new Date(property.created_at).toLocaleDateString()}</td>
            <td>{new Date(property.updated_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
