import { AuthGuard } from './shared/helpers/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
 
import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { AboutusComponent } from 'app/core/components/aboutus/aboutus.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { MysettingComponent } from './core/components/mysetting/mysetting.component';
import { ProductdetailsComponent } from './core/components/productdetails/productdetails.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
 
    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent},
      { path: 'aboutus', component: AboutusComponent},
      { path: 'signup', component: SignupComponent},
      { path: 'productdetails/:id', component: ProductdetailsComponent},
      { 
        path: 'my/settings', 
        component: MysettingComponent, 
        canActivate: [AuthGuard]
      },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 