/**
 * Gets a random integer between an inclusive range.
 * @param {number} min
 * @param {number} max
 * @example
 * randInt(1, 20); // 18
 */
export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}
