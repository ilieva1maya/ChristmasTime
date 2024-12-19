import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmailDirective } from './validators/email.directive';
import { LoaderComponent } from './loader/loader.component';
import { LocationComponent } from './location/location.component';


@NgModule({
  declarations: [
    EmailDirective,
    LoaderComponent,
    LocationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    EmailDirective,
    LoaderComponent,
    LocationComponent,
  ]
})

export class SharedModule { }
