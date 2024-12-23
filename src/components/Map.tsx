import { MapContainer } from './map/MapContainer';
import { Header } from './Header';

const Map = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <MapContainer />
      </div>
    </div>
  );
};

export default Map;