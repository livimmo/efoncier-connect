export const calculateInfoPosition = (
  x: number, 
  y: number,
  windowWidth: number = window.innerWidth,
  windowHeight: number = window.innerHeight,
  infoWidth: number = 320,
  infoHeight: number = 400,
  padding: number = 20
) => {
  // Ajustement horizontal
  let posX = Math.min(Math.max(padding, x), windowWidth - infoWidth - padding);
  
  // Ajustement vertical
  let posY = Math.min(Math.max(padding, y), windowHeight - infoHeight - padding);
  
  return { x: posX, y: posY };
};