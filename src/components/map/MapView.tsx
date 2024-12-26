import { MapContainer } from "./MapContainer";
import { CallCenterButton } from "../support/CallCenterButton";

export const MapView = () => {
  return (
    <div className="relative h-screen w-full">
      <MapContainer />
      <CallCenterButton />
    </div>
  );
};