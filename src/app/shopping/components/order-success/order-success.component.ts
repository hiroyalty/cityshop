import { AppUser } from '../../../shared/models/app-user';
import { UserService } from '../../../shared/helpers/user.service';
import { AuthService } from '../../../shared/helpers/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/helpers/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  order: Order;
  orderID: string;
  subscription: Subscription;
  appUser: AppUser;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private auth: AuthService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.orderID = params.get('id');
      });
    this.subscription = this.orderService.getOneOrder(this.orderID)
      .subscribe(order => {
        this.order = order;
      });
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
} 
