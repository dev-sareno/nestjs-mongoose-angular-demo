import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
// import { GoogleMap, MapInfoWindow, MapMarker, MapPolygon } from "@angular/google-maps";
// import { ApiService } from "../api.service";
// import { of, Subscription, timer } from "rxjs";
// import { catchError, finalize, map, tap } from "rxjs/operators";
// import { RestaurantModel } from "../models/restaurant.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  ngOnInit() {
  }

  // @ViewChild('map') map: GoogleMap;
  // @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  // @ViewChild('inputName') inputName: ElementRef;
  // @ViewChild('inputAddress') inputAddress: ElementRef;
  // @ViewChild('polygon') polygon: MapPolygon;
  //
  // center = {lat: 7.062105856702806, lng: 125.59387804798988};
  // markerOptions = {draggable: false};
  // markerPositions: google.maps.LatLngLiteral[] = [];
  // zoom = 13;
  // display?: google.maps.LatLngLiteral;
  // selectedPos?: google.maps.LatLng;
  // selectedMarker: MapMarker;
  //
  // private restaurants: RestaurantModel[];
  //
  // private mappedRestaurants: { key: string, model: RestaurantModel, }[] = [];
  //
  // private createLocationSubscriptions: { [key: number]: Subscription } = {};
  //
  // constructor(
  //   private apiService: ApiService,
  // ) {
  // }
  //
  // ngOnInit() {
  //   const subsKey = new Date().getTime();
  //   this.createLocationSubscriptions[subsKey] = this.apiService.getRestaurants()
  //     .pipe(
  //       tap((restaurants: RestaurantModel[]) => {
  //         this.restaurants = restaurants;
  //         this.mappedRestaurants = restaurants.map(i => {
  //           const keyString = `${i.location.coordinates[1]},${i.location.coordinates[0]}`;
  //           return { key: keyString, model: i }
  //         });
  //       }),
  //       map((res: RestaurantModel[]) => res.map(i => ({ lat: i.location.coordinates[1], lng: i.location.coordinates[0] }))),
  //       tap((latLngList: google.maps.LatLngLiteral[]) => {
  //         for (const latLng of latLngList) {
  //           this.markerPositions.push(latLng);
  //         }
  //       }),
  //       catchError(err => {
  //         console.log('Fetch failed', err);
  //         return of([]);
  //       }),
  //       finalize(() => {
  //         this.createLocationSubscriptions[subsKey]?.unsubscribe();
  //       }),
  //     )
  //     .subscribe();
  // }
  //
  // getModel(latLng: google.maps.LatLng) {
  //   return this.mappedRestaurants.find(i => i.key === `${latLng.lat()},${latLng.lng()}`).model;
  // }
  //
  // onMapClicked(event: google.maps.MouseEvent) {
  //   this.selectedMarker = null;
  //   this.selectedPos = event.latLng;
  //   this.infoWindow.position = event.latLng.toJSON();
  //   this.infoWindow.open();
  //
  //   // this.polygons[0].push(event.latLng.toJSON())
  //   // console.log(this.polygons)
  // }
  //
  // move(event: google.maps.MouseEvent) {
  //   this.display = event.latLng.toJSON();
  // }
  //
  // onMarkerClicked(marker: MapMarker) {
  //   this.selectedPos = null;
  //   this.selectedMarker = marker;
  //   this.infoWindow.open(marker);
  // }
  //
  // onMapRightClicked() {
  //   this.infoWindow.close();
  // }
  //
  // onAddLocationClicked(selectedPos: google.maps.LatLng) {
  //   if (!this.inputName.nativeElement.value || !this.inputAddress.nativeElement.value) {
  //     return;
  //   }
  //   const subsKey = new Date().getTime();
  //   this.createLocationSubscriptions[subsKey] = this.apiService.createRestaurant({
  //     name: this.inputName.nativeElement.value,
  //     address: this.inputAddress.nativeElement.value,
  //     location: {
  //       coordinates: [selectedPos.lng(), selectedPos.lat()],
  //       type: "Point",
  //     },
  //   })
  //     .pipe(
  //       tap(res => {
  //         console.log('Created');
  //         const keyString = `${res.location.coordinates[1]},${res.location.coordinates[0]}`;
  //         this.mappedRestaurants.push({ key: keyString, model: res })
  //         this.markerPositions.push(selectedPos.toJSON());
  //
  //         // clear
  //         this.selectedPos = null;
  //         this.selectedMarker = null;
  //       }),
  //       catchError(err => {
  //         console.log('Creation failed', err);
  //         return of(null);
  //       }),
  //       finalize(() => {
  //         this.createLocationSubscriptions[subsKey]?.unsubscribe();
  //         this.infoWindow.close();
  //       }),
  //     )
  //     .subscribe();
  // }
  //
  // async run(): Promise<void> {
  //   // for (const res of this.restaurants) {
  //   //   const lat = res.location.coordinates[50];
  //   //   const lng = res.location.coordinates[51];
  //   //   const mod = { ...res };
  //   //   mod.location.coordinates = [lng, lat];
  //   //   const response = await this.apiService.updateRestaurant(mod._id, mod).toPromise();
  //   //   console.log('response=', response);
  //   // }
  //   //
  //   // console.log('Done!');
  // }
  //
  // polygonOptions: google.maps.PolygonOptions = {
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: "#FF0000",
  //   fillOpacity: 0.35
  // };
  //
  // polygonPath = [
  //   { lat: 25.774, lng: -80.19 },
  //   { lat: 18.466, lng: -66.118 },
  //   { lat: 32.321, lng: -64.757 },
  //   { lat: 25.774, lng: -80.19 }
  // ];
  //
  // polygons: google.maps.LatLngLiteral[][] = [
  //   [],
  //   this.polygonPath,
  //   JSON.parse("[{\"lat\":7.081526381693172,\"lng\":125.59250475697425},{\"lat\":7.05767649987361,\"lng\":125.64692141346839},{\"lat\":7.013550981120207,\"lng\":125.62460543446448},{\"lat\":7.030929099042834,\"lng\":125.55559756092933},{\"lat\":7.080163564487085,\"lng\":125.58924319081214}]")
  // ];
  //
  // polylineOption: google.maps.PolylineOptions = {
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  // };
  //
  // polylinePath: google.maps.LatLngLiteral[] = JSON.parse("[{\"lat\":7.081526381693172,\"lng\":125.59250475697425},{\"lat\":7.05767649987361,\"lng\":125.64692141346839},{\"lat\":7.013550981120207,\"lng\":125.62460543446448},{\"lat\":7.030929099042834,\"lng\":125.55559756092933},{\"lat\":7.080163564487085,\"lng\":125.58924319081214}]");
}
