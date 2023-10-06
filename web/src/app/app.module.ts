import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './page/home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import {bootstrapCart4 , bootstrapSearch} from "@ng-icons/bootstrap-icons";
import { BannerComponent } from './components/banner/banner.component';
import { ProductIdComponent } from './page/product-id/product-id.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './page/cart/cart.component';
import { DividerComponent } from './components/divider/divider.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    BannerComponent,
    ProductIdComponent,
    CartComponent,
    DividerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({bootstrapCart4,bootstrapSearch}),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
