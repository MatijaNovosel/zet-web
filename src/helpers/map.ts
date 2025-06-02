import { toDegrees, toRadians } from "./math";

/**
 * Computes the heading from point A to point B.
 * @param from: { lat: number, lng: number }
 * @param to: { lat: number, lng: number }
 * @returns {number} Heading in degrees, from -180 to 180
 */
export function computeHeading(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): number {
  const φ1 = toRadians(from.lat);
  const φ2 = toRadians(to.lat);
  const Δλ = toRadians(to.lng - from.lng);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);

  return (toDegrees(θ) + 360) % 360;
}
