export const BACKEND_URL = import.meta.env.VITE_BACKEND_API as string;
export const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string;
export const DEFAULT_LOCATION = [45.7916835085198, 15.974145329448914]; // Zagreb
export const POLLING_DURATION = 5_000; // 5 seconds

export enum MapTypeEnum {
  Street = 1,
  Satellite = 2
}

export const MINIMUM_ZOOM_LEVEL = 16;
