import { MapLayout } from "@/components/map/MapLayout";
import { MainLayout } from "@/components/layout/MainLayout";

const Index = () => {
  return (
    <MainLayout hideFooter>
      <MapLayout>
        <div className="h-full w-full">
          {/* Map content */}
        </div>
      </MapLayout>
    </MainLayout>
  );
};

export default Index;