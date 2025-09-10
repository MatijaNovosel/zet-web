/**
 * Gets a random integer between an inclusive range.
 * @param {number} min
 * @param {number} max
 * @example
 * randInt(1, 20); // 18
 */
export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
export function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}
