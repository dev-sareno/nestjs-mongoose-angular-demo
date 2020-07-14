import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { RestaurantModel } from "./models/restaurant.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getRestaurants(): Observable<RestaurantModel[]> {
    return this.http.get<RestaurantModel[]>(`api/restaurants`);
  }

  createRestaurant(data: RestaurantModel): Observable<RestaurantModel> {
    return this.http.post<RestaurantModel>(`api/restaurants`, data);
  }

  updateRestaurant(id: string, data: RestaurantModel): Observable<any> {
    console.log('data', data)
    return this.http.put(`api/restaurants/${id}`, data, {
      headers: new HttpHeaders({
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }
}
