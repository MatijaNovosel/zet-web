import { routeColors } from "@/constants/vehicle";
import { randInt } from "./math";
/**
 * Gets a random element of an array.
 * @param {any[]} arr
 * @example
 * sample([1, 2, 3]); // 2
 */
export const sample = (arr) => arr[randInt(0, arr.length - 1)];
/**
 * Generates a string composed of `n` random characters.
 * @param {number} n
 * @example
 * generateRandomString(5); // "AXRF0"
 */
export const generateRandomString = (n) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let res = "";
    while (n--)
        res += sample(characters.split(""));
    return res;
};
export function darkenHexColor(hex, percent) {
    hex = hex.replace(/^#/, "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.max(0, Math.floor(r * (1 - percent / 100)));
    g = Math.max(0, Math.floor(g * (1 - percent / 100)));
    b = Math.max(0, Math.floor(b * (1 - percent / 100)));
    const toHex = (val) => val.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
export const getColorByRouteId = (routeId) => {
    if (routeId) {
        return routeColors[routeId] || routeColors[0];
    }
    return routeColors[0];
};
