import { Container } from "inversify";
import "reflect-metadata";
import { IGTFSService } from "./api/interfaces/gtfs";
import { IMapService } from "./api/interfaces/map";
import { IRouteService } from "./api/interfaces/route";
import { IStopsService } from "./api/interfaces/stops";
import { GTFSService } from "./api/services/gtfs";
import { MapService } from "./api/services/map";
import { RouteService } from "./api/services/route";
import { StopsService } from "./api/services/stops";

export class Types {
  static readonly MapService = Symbol("IMapService");
  static readonly StopsService = Symbol("IStopsService");
  static readonly GtfsService = Symbol("IGtfsService");
  static readonly RouteService = Symbol("IRouteService");
}

const DIContainer = new Container();

DIContainer.bind<IMapService>(Types.MapService).toConstantValue(new MapService());
DIContainer.bind<IStopsService>(Types.StopsService).toConstantValue(new StopsService());
DIContainer.bind<IGTFSService>(Types.GtfsService).toConstantValue(new GTFSService());
DIContainer.bind<IRouteService>(Types.RouteService).toConstantValue(new RouteService());

export function getService<T>(symbol: symbol): T {
  return DIContainer.get<T>(symbol);
}

export default DIContainer;
