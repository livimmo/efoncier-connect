import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

const Property = () => {
  const { id } = useParams();
  
  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Propriété {id}</h1>
        <p>Cette page est en cours de développement.</p>
      </div>
    </MainLayout>
  );
};

export default Property;