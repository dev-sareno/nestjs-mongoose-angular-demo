import { LatLngLiteral } from "@agm/core";

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
  color: string,
}
