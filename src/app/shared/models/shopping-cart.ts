import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';
import 'rxjs/add/operator/map';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            
            //this mtd '...' is cald spreading, we spread our firebase object into our cart object.
            this.items.push(new ShoppingCartItem({ ...item, $key: productId }));

            /*
            Lets initialize in a better way above.
            let x = new ShoppingCartItem();
            Object.assign(x, item);
            x.$key = productId;
            this.items.push(x);
            */   
        }
    }
    
    getQuantity(product: Product) {
        //console.log("product", product);
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }

    get productIds() {
        return Object.keys(this.itemsMap);
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap)
          count += this.itemsMap[productId].quantity;
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

}