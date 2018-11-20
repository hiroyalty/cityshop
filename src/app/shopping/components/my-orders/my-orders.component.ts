import { AuthService } from '../../../shared/helpers/auth.service';
import { OrderService } from '../../../shared/helpers/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: Order[];
  subscription;

  tableResource: DataTableResource<Order>;
  items: Order[] = [];
  itemCount: number;

  orders$;
  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    //this.orders$ = this.authService.user$.switchMap(u => this.orderService.getOrdersByUser(u.uid))
      //.map(items => items.sort((a:Order, b:Order) => b.datePlaced - a.datePlaced));
    this.subscription = this.authService.user$.switchMap(u => this.orderService.getOrdersByUser(u.uid))
      .map(orders => {
      return orders.map((order:Order) => {
        order.shippingname = order.shipping.name;
        order.ddate = new Date(order.datePlaced).toDateString();
        return order;
      })
     }).subscribe(orders => {
      this.orders = orders.sort((a:Order, b: Order) => b['datePlaced'] - a['datePlaced']);
      this.initializeTable(this.orders);
    });
  } 

  private initializeTable(orders: Order[]) {
    this.tableResource = new DataTableResource(orders);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if(!this.tableResource) return;

    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredOrders = (query) ?
      this.orders.filter(p => p.shipping.name.toLowerCase().includes(query.toLowerCase())) :
      this.orders;

    this.initializeTable(filteredOrders);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}