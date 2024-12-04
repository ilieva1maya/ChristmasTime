import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePresentComponent } from './create-present/create-present.component';
import { PresentsRoutingModule } from './presents-routing.module';
import { WarehouseComponent } from './warehouse/warehouse.component';



@NgModule({
  declarations: [
    CreatePresentComponent,
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    PresentsRoutingModule
  ]
})
export class PresentsModule { }
