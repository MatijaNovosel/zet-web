export interface IRouteGeographyFeatureGeometryModel {
  type: string;
  coordinates: [number, number][];
}

export interface IRouteGeographyFeatureModel {
  type: string;
  geometry: IRouteGeographyFeatureGeometryModel;
}

export interface IRouteGeographyModel {
  type: string;
  features: IRouteGeographyFeatureModel[];
}
