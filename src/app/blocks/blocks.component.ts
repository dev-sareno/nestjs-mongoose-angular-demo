import { Component, OnInit } from '@angular/core';
import { LatLngLiteral, PolygonOptions, Polyline, PolylineOptions } from "@agm/core";
import { OverlayType } from "@agm/drawing";
import { CircleOptions } from "@agm/core/services/google-maps-types";

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  mapCenter: LatLngLiteral = {
    lat: 7.081526381693172,
    lng: 125.59250475697425,
  };

  drawingMode: OverlayType = OverlayType.POLYLINE;
  drawingCircleOption: CircleOptions = {
    fillColor:'red',
    radius: 150,
  };
  drawingPolygonOption: PolygonOptions = {
    strokeColor: 'green',
    strokeOpacity: 1,
    strokeWeight: 5,
  };
  drawingPolylineOption: PolylineOptions = {
    strokeColor: 'blue',
    strokeOpacity: 1,
    strokeWeight: 5,
  };

  constructor() { }

  ngOnInit(): void {
  }

  onPolylineCompleted($event: Polyline) {
    console.log('onPolylineCompleted()', $event);
  }

}
