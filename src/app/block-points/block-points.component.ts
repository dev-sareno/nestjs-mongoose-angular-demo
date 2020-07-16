import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BlockModel } from "../models/block.model";
import { RestaurantModel } from "../models/restaurant.model";
import { ApiService } from "../api.service";
import { of, Subscription } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { LatLngLiteral } from "@agm/core";

@Component({
  selector: 'app-block-points',
  templateUrl: './block-points.component.html',
  styleUrls: ['./block-points.component.scss']
})
export class BlockPointsComponent implements OnInit, OnDestroy {

  mapCenter: LatLngLiteral = {
    lat: 7.081526381693172,
    lng: 125.59250475697425,
  };

  block: BlockModel;
  points: RestaurantModel[];

  private getBlockSubscription: Subscription;
  private getBlockPointsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    const blockId = this.route.snapshot.params['block-id'];
    this.getBlockSubscription = this.apiService.getBlock(blockId)
      .pipe(
        tap(block => {
          block.paths = [block.geometry.coordinates[0].map(coordinate => ({lat: coordinate[1], lng: coordinate[0]}))];
          this.block = block;
        }),
        catchError(err => {
          console.log('fetch block error', err);
          return of([]);
        }),
        finalize(() => {
          this.getBlockSubscription?.unsubscribe();
        }),
      )
      .subscribe();

    this.getBlockPointsSubscription = this.apiService.getBlockPoints(blockId)
      .pipe(
        tap(res => {
          this.points = res;
        }),
        catchError(err => {
          console.log('fetch points error', err);
          return of([]);
        }),
        finalize(() => {
          this.getBlockPointsSubscription?.unsubscribe();
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.getBlockSubscription?.unsubscribe();
    this.getBlockPointsSubscription?.unsubscribe();
  }

}
