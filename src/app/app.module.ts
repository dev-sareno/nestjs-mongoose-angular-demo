import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing';
import { BlocksComponent } from './blocks/blocks.component';
import { PointsComponent } from './points/points.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmCreateBlockComponent } from './confirm-create-block/confirm-create-block.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BlockPointsComponent } from './block-points/block-points.component';
import { BlocksExploreComponent } from './blocks-explore/blocks-explore.component';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { RpcComponent } from './rpc/rpc.component';
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlocksComponent,
    PointsComponent,
    ConfirmCreateBlockComponent,
    BlockPointsComponent,
    BlocksExploreComponent,
    RpcComponent,
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
    AgmDrawingModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
