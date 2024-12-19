import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PresentsModule } from './presents/presents.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { appInterceptorProvider } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent, 
    NotFoundComponent, AuthenticateComponent, 
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    PresentsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
