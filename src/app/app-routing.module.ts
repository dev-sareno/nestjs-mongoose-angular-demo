import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { BlocksComponent } from "./blocks/blocks.component";
import { PointsComponent } from "./points/points.component";
import { BlocksExploreComponent } from "./blocks-explore/blocks-explore.component";
import { BlockPointsComponent } from "./block-points/block-points.component";


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'blocks',
    component: BlocksComponent,
  },
  {
    path: 'points',
    component: PointsComponent,
  },
  {
    path: 'blocks/:block-id/points',
    component: BlockPointsComponent,
  },
  {
    path: 'blocks/explore/:latitude/:longitude',
    component: BlocksExploreComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
