import { Component, OnInit } from '@angular/core';
import { LatLngLiteral, MouseEvent } from "@agm/core";
import { BlockModel } from "../models/block.model";
import { ActivatedRoute } from "@angular/router";
import { of, Subscription } from "rxjs";
import { ApiService } from "../api.service";
import { catchError, finalize, tap } from "rxjs/operators";

@Component({
  selector: 'app-blocks-explore',
  templateUrl: './blocks-explore.component.html',
  styleUrls: ['./blocks-explore.component.scss']
})
export class BlocksExploreComponent implements OnInit {

  mapCenter: LatLngLiteral = {
    lat: 7.081526381693172,
    lng: 125.59250475697425,
  };

  marker: LatLngLiteral;
  block: BlockModel;
  isLoading = false;

  private getBlockSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    const lat = this.route.snapshot.params['latitude'];
    const lng = this.route.snapshot.params['longitude'];
    this.marker = { lat, lng };
    this.getBlock(lat, lng);
  }

  onDragEnd($event: MouseEvent) {
    this.isLoading = true;
    this.marker = $event.coords;
    this.getBlockSubscription?.unsubscribe();
    this.getBlock($event.coords.lat, $event.coords.lng);
  }

  private getBlock(lat: number, lng: number) {
    this.getBlockSubscription = this.apiService
      .getBlockFromPoint(lat, lng)
      .pipe(
        tap( block => {
          if (block) {
            block.paths = [block.geometry.coordinates[0].map(coordinate => ({lat: coordinate[1], lng: coordinate[0]}))];
          }
          this.block = block;
        }),
        catchError(err => {
          console.log('error fetch block', err);
          return of(null);
        }),
        finalize(() => {
          this.getBlockSubscription?.unsubscribe();
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

}
