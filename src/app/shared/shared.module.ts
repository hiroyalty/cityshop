import { AlertService } from './helpers/alert.service';
import { NotificationService } from './helpers/notification.service';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { DataTableModule } from 'angular-4-data-table';
import { CustomFormsModule } from 'ng2-validation/dist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AuthGuard } from './helpers/auth-guard.service';
import { AuthService } from './helpers/auth.service';
import { CategoryService } from './helpers/category.service';
import { OrderService } from './helpers/order.service';
import { ProductService } from './helpers/product.service';
import { ShoppingCartService } from './helpers/shopping-cart.service';
import { UserService } from './helpers/user.service';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { GrowlModule, MessagesModule } from 'primeng/primeng';
import { LowerCaseDirective } from './lower-case.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    GrowlModule,
    MessagesModule,
    DataTableModule,
    MomentModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    GalleryComponent,
    NotificationsComponent,
    LowerCaseDirective,
    //TitleCasePipe
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    GalleryComponent,
    NotificationsComponent,
    GrowlModule,
    MessagesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    DataTableModule,
    MomentModule,
    LowerCaseDirective,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotificationService,
    AlertService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
