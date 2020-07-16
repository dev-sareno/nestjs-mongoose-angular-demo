import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlPosition, LatLngLiteral, Polygon, PolygonOptions, Polyline, PolylineOptions } from "@agm/core";
import { DrawingControlOptions, OverlayType } from "@agm/drawing";
import { CircleOptions } from "@agm/core/services/google-maps-types";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmCreateBlockComponent } from "../confirm-create-block/confirm-create-block.component";
import { ApiService } from "../api.service";
import { BlockModel } from "../models/block.model";
import { catchError, finalize, tap } from "rxjs/operators";
import { of, Subscription } from "rxjs";

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit, OnDestroy {

  mapCenter: LatLngLiteral = {
    lat: 7.081526381693172,
    lng: 125.59250475697425,
  };

  drawingMode: OverlayType = OverlayType.POLYGONE;
  drawingCircleOption: CircleOptions = {
    fillColor:'red',
    radius: 150,
  };
  drawingPolygonOption: PolygonOptions = {
    strokeColor: 'blue',
    strokeOpacity: 1,
    strokeWeight: 5,
  };
  drawingPolylineOption: PolylineOptions = {
    strokeColor: 'green',
    strokeOpacity: 1,
    strokeWeight: 5,
  };

  blocks: BlockModel[] = [];

  private createBlockSubscriptions: { [key: string]: Subscription } = {};
  drawingControlOptions: DrawingControlOptions = {
    drawingModes: [OverlayType.POLYGONE],
    position: ControlPosition.TOP_CENTER,
  };

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    const key = new Date().getTime();
    this.createBlockSubscriptions[key] = this.apiService.getBlocks()
      .pipe(
        tap(blocks => {
          console.log('blocks', blocks);
          blocks.forEach(block => {
            // reformat data
            block.paths = [block.geometry.coordinates[0].map(coordinate => ({lat: coordinate[1], lng: coordinate[0]}))];
          });
          this.blocks = blocks;
        }),
        catchError(err => {
          console.log('error getting blocks', err);
          return of(null);
        }),
        finalize(() => {
          this.createBlockSubscriptions[key]?.unsubscribe();
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    for (const prop in this.createBlockSubscriptions) {
      this.createBlockSubscriptions[prop]?.unsubscribe();
    }
  }

  onPolylineCompleted($event: Polyline) {

  }

  onPolygonCompleted($event: Polygon) {
    const path = $event.getPath().getArray()
      .map(i => i.toJSON())
      .map(i => [i.lng, i.lat]);
    const head = path[0];
    let tail = path[path.length - 1];
    if (head[0] !== tail[0] || head[1] !== tail[1]) {
      // ensure the head and tail are same
      path.push(head);
    }

    console.log('path', path);
    const dialogRef = this.dialog.open(ConfirmCreateBlockComponent, {
      width: '250px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: {
      name: string | null,
      address: string | null
    }) => {
      console.log('result', result);
      if (result) {
        // create
        const key = new Date().getTime();
        const data: BlockModel = {
          name: result.name,
          address: result.name,
          geometry: {
            type: 'Polygon',
            coordinates: [path],
          },
          tags: ['block', 'Davao City', 'Philippines']
        }
        this.createBlockSubscriptions[key] = this.apiService.createBlock(data)
          .pipe(
            tap(block => {
              console.log('block created', block);
              block.paths = [block.geometry.coordinates[0].map(coordinate => ({lat: coordinate[1], lng: coordinate[0]}))];
              this.blocks.push(block);
              $event.setVisible(false);
            }),
            catchError(err => {
              console.log('error creating block', err);
              return of(null);
            }),
            finalize(() => {
              this.createBlockSubscriptions[key]?.unsubscribe();
            }),
          )
          .subscribe();
      } else {
        // cancelled
        $event.setVisible(false);
      }
    });
  }
}
