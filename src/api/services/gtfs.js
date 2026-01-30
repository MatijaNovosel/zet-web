import client from "@/plugins/axios";
export class GTFSService {
    async getData() {
        const { data } = await client.get("/get_vehicle_data");
        return data;
    }
}
