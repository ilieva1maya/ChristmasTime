import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePresentComponent } from './create-present/create-present.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { DetailsPresentComponent } from './details-present/details-present.component';

const routes: Routes = [
  {
    path: 'warehouse',
    children: [
      { path: '', pathMatch: 'full', component: WarehouseComponent },
      { path: ':presentId', component: DetailsPresentComponent }
      // { path: ':postId', component: DetailsPresentComponent, canActivate: [AuthActivate] }
    ]
  },
  {
    path: 'create-present',
    component: CreatePresentComponent,
    // canActivate: [AuthActivate]
  },
  // {
  //   path: 'warehouse',
  //   component: WarehouseComponent,
  //   // canActivate: [AuthActivate]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PresentsRoutingModule { }
