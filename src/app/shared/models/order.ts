import { AuthService } from '../helpers/auth.service';
import { AppUser } from './app-user';
import { ShoppingCart } from './shopping-cart';
import { Observable } from 'rxjs/Observable';

export class Order {
    datePlaced: number;
    items: any[];
    grandTotalPrice: number;
    orderUser: any;
    shippingname: any;
    ddate: any;
    //orderUser: Observable<AppUser>;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart){
        this.datePlaced = new Date().getTime();
        this.grandTotalPrice = shoppingCart.totalPrice;

        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
        });  
    }
    
}