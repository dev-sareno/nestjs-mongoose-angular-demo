import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { MapComponent } from './map/map.component';
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing';
import { BlocksComponent } from './blocks/blocks.component';
import { PointsComponent } from './points/points.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    BlocksComponent,
    PointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdGhRDOdt3fpmluXq9DMttOEIU-bBIehM',
      libraries: ['drawing']
    }),
    AgmDrawingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
