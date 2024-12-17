import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePresentComponent } from './create-present/create-present.component';
import { PresentsRoutingModule } from './presents-routing.module';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsPresentComponent } from './details-present/details-present.component';
import { ReservePresentComponent } from './reserve-present/reserve-present.component';



@NgModule({
  declarations: [
    CreatePresentComponent,
    WarehouseComponent,
    DetailsPresentComponent,
    ReservePresentComponent
  ],
  imports: [
    CommonModule,
    PresentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PresentsModule { }
