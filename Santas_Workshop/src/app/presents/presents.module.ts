import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePresentComponent } from './create-present/create-present.component';
import { PresentsRoutingModule } from './presents-routing.module';



@NgModule({
  declarations: [
    CreatePresentComponent
  ],
  imports: [
    CommonModule,
    PresentsRoutingModule
  ]
})
export class PresentsModule { }
