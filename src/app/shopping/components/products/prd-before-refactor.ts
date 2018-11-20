/*import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../../../shared/helpers/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/helpers/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any; //later implement a model interface for this
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { 
      
    }

    async ngOnInit() {
      this.subscription = (await this.shoppingCartService.getCart())
        .subscribe(cart => this.cart = cart);

      this.productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
      
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    }
*/
  /*ngOnInit() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
      
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) :
          this.products;
      })
    });

    this.categories$ = this.categoryService.getAll();
  }*/
/*
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
*/