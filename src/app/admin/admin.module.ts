import { MomentModule } from 'angular2-moment';
import { AuthGuard } from '../shared/helpers/auth-guard.service';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-4-data-table/src/index';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AdminCategoryComponent } from './components/admin-category/admin-category.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: 'admin/category/new', 
        component: CategoryFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/category/:id', 
        component: CategoryFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/categories', 
        component: AdminCategoryComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    CategoryFormComponent,
    AdminCategoryComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
