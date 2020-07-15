export interface AgmMarkerType {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  temporary?: boolean;
}

export function newAgmMarker(data: AgmMarkerType): AgmMarkerType {
  return {
    label: '',
    draggable: false,
    temporary: false,
    ...data
  }
}
