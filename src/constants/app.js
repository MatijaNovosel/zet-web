export const WEB_URL = "https://zet.knork-studio.com/#/";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_API;
export const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;
export const DEFAULT_LOCATION = [45.7916835085198, 15.974145329448914]; // Zagreb
export const POLLING_DURATION = 5_000; // 5 seconds
export var MapTypeEnum;
(function (MapTypeEnum) {
    MapTypeEnum[MapTypeEnum["Street"] = 1] = "Street";
    MapTypeEnum[MapTypeEnum["Satellite"] = 2] = "Satellite";
})(MapTypeEnum || (MapTypeEnum = {}));
export const MINIMUM_ZOOM_LEVEL = 16;
