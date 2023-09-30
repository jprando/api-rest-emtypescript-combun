export function numeroAleatorio(min: number = 0, max: number = 1000) {
  return Math.floor(Math.random() * (max - min) + min);
}
