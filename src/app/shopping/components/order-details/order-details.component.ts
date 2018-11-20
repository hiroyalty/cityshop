import { Observable } from 'rxjs/Observable';
import { AppUser } from '../../../shared/models/app-user';
import { UserService } from '../../../shared/helpers/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/helpers/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order; Order;
  orderID: string;
  //subscription: Subscription;
  appUser; AppUser;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.orderID = this.route.snapshot.paramMap.get('id');
    if (this.orderID) 
      this.orderService.getOneOrder(this.orderID).take(1).subscribe(o => this.order = o);
  }

  get apUser() {
    this.userService.get(this.order.userId).take(1).subscribe(u => this.appUser = u );
    return this.appUser;
  }
 
} 
