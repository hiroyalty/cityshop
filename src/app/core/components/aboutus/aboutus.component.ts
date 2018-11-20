import { NotificationService } from './../../../shared/helpers/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    //this.notificationService.notify("error", "login error", "Aye you there!");
  }

}