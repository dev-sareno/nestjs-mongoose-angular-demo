import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { RestaurantModel } from "./models/restaurant.model";
import { BlockModel } from "./models/block.model";

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

  createBlock(data: BlockModel): Observable<BlockModel> {
    return this.http.post<BlockModel>(`api/blocks`, data);
  }

  getBlock(blockId: string): Observable<BlockModel> {
    return this.http.get<BlockModel>(`api/blocks/${blockId}`);
  }

  getBlocks(): Observable<BlockModel[]> {
    return this.http.get<BlockModel[]>(`api/blocks`);
  }

  getBlockPoints(blockId: string): Observable<RestaurantModel[]> {
    return this.http.get<RestaurantModel[]>(`api/blocks/${blockId}/points`);
  }

  getBlockFromPoint(lat: number, lng: number): Observable<BlockModel | null> {
    return this.http.get<BlockModel | null>(`api/blocks/from-point`, {
      params: {
        lat: lat.toString(),
        lng: lng.toString(),
      }
    });
  }

  getRpcDataBlob(limit: number, resType: string): Observable<ArrayBuffer> {
    return this.http.get(`api/rpc`, {
      params: {
        'limit': limit.toString(),
        'res-type': resType,
      },
      headers: new HttpHeaders({
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      }),
      responseType: 'arraybuffer'
    });
  }

  getRpcDataJson(limit: number, resType: string): Observable<any> {
    return this.http.get(`api/rpc`, {
      params: {
        'limit': limit.toString(),
        'res-type': resType,
      }
    });
  }
}
