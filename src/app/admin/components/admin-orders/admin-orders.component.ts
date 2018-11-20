import { Order } from '../../../shared/models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../../shared/helpers/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'shared/helpers/user.service';
import { DataTableResource } from 'angular-4-data-table';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import { FirebaseListObservable } from 'angularfire2/database';
import { MomentModule } from 'angular2-moment';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  ordersWithUser: any;
  orders: Order[];
  order: Order;
  subscription;

  tableResource: DataTableResource<Order>;
  items: Order[] = [];
  itemCount: number;

  orders$;
  constructor(private orderService: OrderService, private userService: UserService) { }
 
  async ngOnInit() {
    this.ordersWithUser = await this.orderService.getOrders()
      .map(orders => {
        return orders.map((order:Order) => {
          this.userService.get(order.userId).subscribe(u => order.orderUser = u.name)
          order.shippingname = order.shipping.name;
          order.ddate = new Date(order.datePlaced).toDateString();
          return order;
        })
       }).subscribe(orders => {
        this.orders = orders.sort((a:Order, b: Order) => b['datePlaced'] - a['datePlaced']);
        this.initializeTable(this.orders);
    });

    // this.ordersWithUser = this.orderService.getOrders()
    //   .switchMap(orders => {
    //     let userObservables = orders.map(order => this.userService.get(order.userId));
    
    //     // Combine the user observables, and match up the users with the
    //     // orders, etc.
    
    //     return userObservables.length === 0 ?
    //       Observable.of(orders) :
    //       Observable.combineLatest(...userObservables, (...users) => {
    //         orders.forEach((order, index) => {
    //           order.orderUser = users[index].name;
    //           //project.avatar = users[index].avatar;
    //         });
    //         orders = orders.sort((a:Order, b: Order) => b['datePlaced'] - a['datePlaced']);
    //         return orders;          
    //       });
    // }).subscribe(orders => this.orders = orders)
    //console.log(this.orders)
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
    this.ordersWithUser.unsubscribe();
  }
  
} 
