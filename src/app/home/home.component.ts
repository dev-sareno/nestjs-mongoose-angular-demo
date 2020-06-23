import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurants$: Observable<any[]>;
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.restaurants$ = this.apiService.getRestaurants();
  }

}
