import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgmInfoWindow, AgmMarker, LatLngLiteral, MouseEvent } from "@agm/core";
import { AgmMarkerType, newAgmMarker } from "../types/agm.type";
import { ApiService } from "../api.service";
import { of, Subscription } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { RestaurantModel } from "../models/restaurant.model";

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit, OnDestroy {

  mapCenter: LatLngLiteral = {
    lat: 7.081526381693172,
    lng: 125.59250475697425,
  };

  markers: AgmMarkerType[] = [];
  visibleInfoWindows: AgmInfoWindow[] = [];

  restaurants?: RestaurantModel[];
  restaurantMarkerMap: { [key: number]: LatLngLiteral } = { };

  private createLocationSubscriptions: { [key: number]: Subscription } = {};

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    const subsKey = new Date().getTime();
    this.createLocationSubscriptions[subsKey] = this.apiService.getRestaurants()
      .pipe(
        tap((restaurants: RestaurantModel[]) => {
          this.restaurants = restaurants;
          this.markers = restaurants.map(i => ({ lat: i.location.coordinates[1], lng: i.location.coordinates[0] }));
          for (const restaurant of restaurants) {
            const key = `${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`;
            this.restaurantMarkerMap[key] = restaurant;
          }
        }),
        catchError(err => {
          console.log('Fetch failed', err);
          return of([]);
        }),
        finalize(() => {
          this.createLocationSubscriptions[subsKey]?.unsubscribe();
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    for (const prop in this.createLocationSubscriptions) {
      this.createLocationSubscriptions[prop]?.unsubscribe();
    }
  }

  getModel(marker: AgmMarkerType): RestaurantModel {
    const key = `${marker.lat},${marker.lng}`;
    return this.restaurantMarkerMap[key];
  }

  onMapClicked($event: MouseEvent) {
    console.log('onMapClicked()');
    this.markers.push(newAgmMarker({ temporary: true, ...$event.coords }));
    console.log(this.markers);
  }

  onMarkerClicked($event: AgmMarker) {
    console.log('onMarkerClicked()');
  }

  onAddLocationClicked(marker: AgmMarkerType,
                       infoWindow: AgmInfoWindow,
                       inputName: HTMLInputElement,
                       inputAddress: HTMLInputElement) {
    console.log(marker, inputName, inputAddress);
    if (!inputName.value || !inputAddress.value) {
      return;
    }
    const subsKey = new Date().getTime();
    this.createLocationSubscriptions[subsKey] = this.apiService.createRestaurant({
      name: inputName.value,
      address: inputAddress.value,
      location: {
        coordinates: [marker.lng, marker.lat],
        type: "Point",
      },
    })
      .pipe(
        tap(res => {
          console.log('Created', res);
          this.markers.push(newAgmMarker({ ...marker }));
        }),
        catchError(err => {
          console.log('Creation failed', err);
          return of(null);
        }),
        finalize(() => {
          this.createLocationSubscriptions[subsKey]?.unsubscribe();
          infoWindow.close().then();
        }),
      )
      .subscribe();
  }
}
