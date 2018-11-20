import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId).remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    // return a shopping cart object
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity < 1) item$.remove();
      else item$.update({ 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }

  // to call an asynchronous mtd that returns a promise like a synchronous mtd so we dont use the 
  // 'then' keyword as seen below, we use the async decorator on the method name and apply the await keyword
  // on the asynchronous mtd.
  /*private getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.create().then(result => {
        localStorage.setItem('cartId', result.key);
        // return a shopping cart object

        return this.getCart(result.key);
      });
    } else {
      // return a shopping cart object
      return this.getCart(cartId);
    }
  } */
}
