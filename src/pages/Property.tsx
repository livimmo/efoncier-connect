import { useParams } from "react-router-dom";
import { PropertyPreview } from "@/components/property/PropertyPreview";

const Property = () => {
  const { id } = useParams();
  return <PropertyPreview propertyId={id} />;
};

export default Property;