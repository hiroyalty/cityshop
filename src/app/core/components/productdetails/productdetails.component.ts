import { Product } from 'shared/models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/helpers/product.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/helpers/shopping-cart.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  //@Input('shopping-cart') shoppingCart: ShoppingCart;
  id;
  product: Product;
  images: Array<string>;
  cart$: Observable<ShoppingCart>; //later implement a model interface for this

  constructor(private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private productService: ProductService) 
    { 
      //this.id = this.route.snapshot.paramMap.get('id');
    // if (this.id) this.productService.getOne(this.id).take(1).subscribe((p: Product) => {
    //   this.product = p;
    // });
    // if (this.id) this.productService.getOne(this.id).take(1)
    // .map((p: Product) => {
    //   //this.product = p;
    //   return p;
    // }).subscribe(p => { this.product = p });
    // console.log(this.product)
  }

   async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.loadProduct();
    //console.log(this.cart$)
  }

  private loadProduct() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getOne(this.id).take(1)
    .map((p: Product) => {
      //this.product = p;
      return p;
    }).subscribe(p => { this.product = p });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
