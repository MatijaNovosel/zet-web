export interface IGTFSHeaderModel {
  gtfsRealtimeVersion: string;
  incrementality: string;
  timestamp: string;
}

export interface IGTFSStopTimeEventModel {
  delay?: number;
  time?: string;
}

export interface IGTFSStopTimeUpdateModel {
  stopSequence: number;
  arrival?: IGTFSStopTimeEventModel;
  departure?: IGTFSStopTimeEventModel;
  stopId: string;
  scheduleRelationship: string;
}

export interface IGTFSRouteTripModel {
  tripId: string;
  startDate: string;
  scheduleRelationship: string;
  routeId: string;
}

export interface IGTFSEntityTripUpdateModel {
  trip: IGTFSRouteTripModel;
  stopTimeUpdate: IGTFSStopTimeUpdateModel[];
  timestamp: string;
}

export interface IGTFSVehiclePositionModel {
  trip: IGTFSRouteTripModel;
  position: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
  vehicle: {
    id: string;
  };
}

export interface IGTFSAlertTimeRangeModel {
  start?: number;
  end?: number;
}

export interface IGTFSAlertEntitySelectorModel {
  agencyId?: string;
  routeId?: string;
  routeType?: number;
  stopId?: string;
  trip?: IGTFSRouteTripModel;
}

export interface IGTFSAlertTranslationModel {
  text: string;
  language?: string;
}

export interface IGTFSAlertModel {
  activePeriod?: IGTFSAlertTimeRangeModel[];
  informedEntity?: IGTFSAlertEntitySelectorModel[];
  cause?: string;
  effect?: string;
  url?: IGTFSAlertTranslationModel;
  headerText?: IGTFSAlertTranslationModel;
  descriptionText?: IGTFSAlertTranslationModel;
}

export interface IGTFSEntityModel {
  id: string;
  tripUpdate?: IGTFSEntityTripUpdateModel;
  vehicle?: IGTFSVehiclePositionModel;
  alert?: IGTFSAlertModel;
}

export interface GTFSModel {
  header?: IGTFSHeaderModel;
  entity: IGTFSEntityModel[];
}
