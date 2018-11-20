import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { SignupComponent } from './components/signup/signup.component';
import { MysettingComponent } from './components/mysetting/mysetting.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent, 
    LoginComponent,
    AboutusComponent,
    SignupComponent,
    ProductdetailsComponent,
    MysettingComponent,
    FooterComponent
  ],
  exports: [
    BsNavbarComponent,
    ProductdetailsComponent,
    FooterComponent
  ]
})
export class CoreModule { }
