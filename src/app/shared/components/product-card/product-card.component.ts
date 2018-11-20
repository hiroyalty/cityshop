import { Router } from '@angular/router';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../helpers/shopping-cart.service';
import { ShoppingCartComponent } from '../../../shopping/components/shopping-cart/shopping-cart.component';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  seeFullProduct() {
    //console.log(this.product.$key); 
    this.router.navigate(['/productdetails/'+this.product.$key]);
  }
 
}
