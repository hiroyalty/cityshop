import { AlertService } from './../../../shared/helpers/alert.service';
import { NotificationService } from './../../../shared/helpers/notification.service';
import { AuthService } from '../../../shared/helpers/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {};
  userEmail;
  userPassword;
  errorMessage;
  error: {name: string, message: string} = {name: '', message: ''};
  constructor(
    private modalService: NgbModal, 
    private auth: AuthService,
    private alertService: AlertService,
    private router: Router,
    private notificationService: NotificationService) {
 
  }

  loginGoogle() {
    this.auth.loginGoogle();
  }

  loginFacebook() {
    this.auth.loginFacebook();
  }

  loginEmail(form: NgForm): void {
    //console.log(form.value.email);
    this.userEmail = form.value.email;
    this.userPassword = form.value.password;
    let returnUrl = localStorage.getItem('returnUrl');
    if (!returnUrl) {returnUrl = '/'}
    this.auth.loginEmail(this.userEmail, this.userPassword)
    .then(() => 
      this.router.navigateByUrl(returnUrl)
      //this.router.navigate(['/user']
    )
    .catch(_error => {
      this.error = _error; 
      //this.alertService.error(this.error.message);
      this.errorMessage = this.error.message;
      this.notificationService.notify("error", "Login Error", "Invalid Username and/or Password");
      //this.router.navigate(['/login'])
    }) 
  }
  
}
