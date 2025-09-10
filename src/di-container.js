import { Container } from "inversify";
import "reflect-metadata";
import { GTFSService } from "./api/services/gtfs";
import { MapService } from "./api/services/map";
import { RouteService } from "./api/services/route";
import { StopsService } from "./api/services/stops";
export class Types {
    static MapService = Symbol("IMapService");
    static StopsService = Symbol("IStopsService");
    static GtfsService = Symbol("IGtfsService");
    static RouteService = Symbol("IRouteService");
}
const DIContainer = new Container();
DIContainer.bind(Types.MapService).toConstantValue(new MapService());
DIContainer.bind(Types.StopsService).toConstantValue(new StopsService());
DIContainer.bind(Types.GtfsService).toConstantValue(new GTFSService());
DIContainer.bind(Types.RouteService).toConstantValue(new RouteService());
export function getService(symbol) {
    return DIContainer.get(symbol);
}
export default DIContainer;
