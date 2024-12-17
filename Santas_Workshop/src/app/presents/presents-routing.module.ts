import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePresentComponent } from './create-present/create-present.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { DetailsPresentComponent } from './details-present/details-present.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
  {
    path: 'warehouse',
    children: [
      { path: '', pathMatch: 'full', component: WarehouseComponent },
      { path: ':presentId', component: DetailsPresentComponent }
    ]
  },
  {
    path: 'create-present',
    component: CreatePresentComponent,
    canActivate: [AuthActivate]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PresentsRoutingModule { }
