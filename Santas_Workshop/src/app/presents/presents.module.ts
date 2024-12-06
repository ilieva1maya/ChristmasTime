import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePresentComponent } from './create-present/create-present.component';
import { PresentsRoutingModule } from './presents-routing.module';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreatePresentComponent,
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    PresentsRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class PresentsModule { }
