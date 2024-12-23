import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8",
        version: "weekly",
      });

      try {
        const google = await loader.load();
        
        if (mapRef.current && !googleMapRef.current) {
          const mapOptions = {
            center: { lat: 31.7917, lng: -7.0926 }, // Morocco center
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          };

          const map = new google.maps.Map(mapRef.current, mapOptions);
          googleMapRef.current = map;

          // Add a sample marker
          const marker = new google.maps.Marker({
            position: { lat: 33.5731, lng: -7.5898 }, // Casablanca coordinates
            map: map,
            title: "Sample Property",
          });

          // Add click listener to marker
          marker.addListener("click", () => {
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div>
                  <h3>Property Details</h3>
                  <p>Location: Casablanca</p>
                  <p>Status: Available</p>
                </div>
              `,
            });
            infoWindow.open(map, marker);
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  return (
    <div className="w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-[calc(100vh-4rem)]"
        style={{ position: 'relative' }}
      />
    </div>
  );
};