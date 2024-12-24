import { Header } from '../Header';
import { MapLayout } from './MapLayout';

const Map = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <MapLayout />
      </div>
    </div>
  );
};

export default Map;