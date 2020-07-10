import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from "@angular/google-maps";
import { ApiService } from "../api.service";
import { of, Subscription } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { RestaurantModel } from "../models/restaurant.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('map') map: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild('inputAddress') inputAddress: ElementRef;

  center = {lat: 7.062105856702806, lng: 125.59387804798988};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 13;
  display?: google.maps.LatLngLiteral;
  selectedPos?: google.maps.LatLng;
  selectedMarker: MapMarker;

  private mappedRestaurants: { key: string, model: RestaurantModel, }[] = [];

  private createLocationSubscriptions: { [key: number]: Subscription } = {};

  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    const subsKey = new Date().getTime();
    this.createLocationSubscriptions[subsKey] = this.apiService.getRestaurants()
      .pipe(
        tap((restaurants: RestaurantModel[]) => {
          this.mappedRestaurants = restaurants.map(i => {
            const keyString = `${i.location.coordinates[0]},${i.location.coordinates[1]}`;
            return { key: keyString, model: i }
          });
        }),
        map((res: RestaurantModel[]) => res.map(i => ({ lat: i.location.coordinates[0], lng: i.location.coordinates[1] }))),
        tap((latLngList: google.maps.LatLngLiteral[]) => {
          for (const latLng of latLngList) {
            this.markerPositions.push(latLng);
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

  getModel(latLng: google.maps.LatLng) {
    return this.mappedRestaurants.find(i => i.key === `${latLng.lat()},${latLng.lng()}`).model;
  }

  onMapClicked(event: google.maps.MouseEvent) {
    this.selectedMarker = null;
    this.selectedPos = event.latLng;
    this.infoWindow.position = event.latLng.toJSON();
    this.infoWindow.open();
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  onMarkerClicked(marker: MapMarker) {
    this.selectedPos = null;
    this.selectedMarker = marker;
    this.infoWindow.open(marker);
  }

  onMapRightClicked() {
    this.infoWindow.close();
  }

  onAddLocationClicked(selectedPos: google.maps.LatLng) {
    if (!this.inputName.nativeElement.value || !this.inputAddress.nativeElement.value) {
      return;
    }
    const subsKey = new Date().getTime();
    this.createLocationSubscriptions[subsKey] = this.apiService.createRestaurant({
      name: this.inputName.nativeElement.value,
      address: this.inputAddress.nativeElement.value,
      location: {
        coordinates: [selectedPos.lat(), selectedPos.lng()],
        type: "Point",
      },
    })
      .pipe(
        tap(res => {
          console.log('Created');
          const keyString = `${res.location.coordinates[0]},${res.location.coordinates[1]}`;
          this.mappedRestaurants.push({ key: keyString, model: res })
          this.markerPositions.push(selectedPos.toJSON());
        }),
        catchError(err => {
          console.log('Creation failed', err);
          return of(null);
        }),
        finalize(() => {
          this.createLocationSubscriptions[subsKey]?.unsubscribe();
          this.infoWindow.close();
        }),
      )
      .subscribe();
  }
}
