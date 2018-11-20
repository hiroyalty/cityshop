import { Order } from './../models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders():Observable<Order[]>{
    //return this.db.list('/orders');
    return this.db.list('/orders');
      
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  getOneOrder(orderId: string) {
    return this.db.object('/orders/' + orderId);
  }

}
