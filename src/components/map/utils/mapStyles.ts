export const getMapStyles = (theme: 'light' | 'dark') => {
  return theme === 'dark' ? [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  ] : [
    { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#7c93a3" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#E3F2FD" }] },
    { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#F5F5F5" }] },
  ];
};