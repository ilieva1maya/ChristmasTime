import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { GuestGuard } from '../guards/guest.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [GuestGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
