import client from "@/plugins/axios";
export class StopsService {
    async getArrivals(stopId) {
        const { data } = await client.get(`/arrivals/${stopId}`);
        return data.sort((a, b) => a.arrivalTimeInMinutes - b.arrivalTimeInMinutes);
    }
    async getStops() {
        const { data } = await client.get("/stops");
        return data.map((x) => ({
            stopId: x.stop_id,
            stopName: x.stop_name,
            stopLat: x.stop_lat,
            stopLon: x.stop_lon
        }));
    }
    async getBajsStops() {
        const { data } = await client.get("/bajs");
        return data;
    }
}
