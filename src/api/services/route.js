import client from "@/plugins/axios";
export class RouteService {
    async getRouteGeography(routeId) {
        const { data } = await client.get(`/route/${routeId}/geography`);
        return data;
    }
}
