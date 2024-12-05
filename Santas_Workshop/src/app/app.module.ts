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



@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent, 
    NotFoundComponent, 
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    PresentsModule,
    AppRoutingModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
