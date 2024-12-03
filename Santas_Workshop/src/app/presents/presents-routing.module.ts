import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePresentComponent } from './create-present/create-present.component';

const routes: Routes = [
  // {
  //     path: 'themes',
  //     children: [
  //         { path: '', pathMatch: 'full', component: MainComponent },
  //         { path: ':themeId', component: CurrentThemeComponent }
  //     ]
  // },
  {
      path: 'create-present',
      component: CreatePresentComponent,
      // canActivate: [AuthActivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PresentsRoutingModule { }
