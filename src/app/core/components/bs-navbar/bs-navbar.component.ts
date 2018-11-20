import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/helpers/shopping-cart.service';
import { Router } from '@angular/router';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/helpers/auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/helpers/category.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  collapsed = true;
  categories$;

  //always unsubscribe frm firebase observables.
  constructor(
    private auth: AuthService, 
    private router: Router,
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService) {  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
    this.categories$ = this.categoryService.getAll();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
 