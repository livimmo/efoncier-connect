export const calculateInfoPosition = (
  x: number, 
  y: number,
  windowWidth: number = window.innerWidth,
  windowHeight: number = window.innerHeight,
  infoWidth: number = 320,
  infoHeight: number = 500,
  padding: number = 20
) => {
  // Ajustement horizontal - préférer le côté droit si possible
  let posX = x + padding;
  if (posX + infoWidth > windowWidth - padding) {
    posX = x - infoWidth - padding; // Placer à gauche si pas assez d'espace à droite
  }
  
  // Ajustement vertical - centrer verticalement si possible
  let posY = y - infoHeight / 2;
  
  // Vérifier les limites verticales
  if (posY < padding) {
    posY = padding;
  } else if (posY + infoHeight > windowHeight - padding) {
    posY = windowHeight - infoHeight - padding;
  }
  
  return { x: posX, y: posY };
};