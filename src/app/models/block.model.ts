import { LatLngLiteral } from "@agm/core";
import { LatLng } from "@agm/core/services/google-maps-types";

export interface BlockModel {
  geometry: {
    coordinates: number[][][],
    type: 'Polygon' | string
  },
  tags?: string[],
  _id?: string,
  name: string,
  address: string,
  __v?: 0,
  paths?: Array<Array<LatLngLiteral>>,
}
