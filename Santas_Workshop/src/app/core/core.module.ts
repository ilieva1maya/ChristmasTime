import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }




// import { ErrorComponent } from './error/error.component';


// @NgModule({
//   declarations: [
//     HeaderComponent,
//     FooterComponent,
//     ErrorComponent,
//   ],
//   imports: [
//     CommonModule, RouterModule,
//   ],
//   exports: [
//     HeaderComponent,
//     FooterComponent,
//   ]
// })
// export class CoreModule { }