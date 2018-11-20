import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>; //later implement a model interface for this

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {

    }

    async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart();
      this.populateProducts();
    }

    private populateProducts() {
      this.productService
      .getAll()
      .switchMap((products: Product[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
    }
    private applyFilter() {
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
    }

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

}
