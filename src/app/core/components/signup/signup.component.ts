import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'shared/helpers/user.service';
import { NotificationService } from 'shared/helpers/notification.service';
import {ValidationManager} from "ng2-validation-manager";
import { AuthService } from 'shared/helpers/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usermodel: any = {};
  form;
  isAdmin: boolean = false;
  errorMessage: string;
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    private auth: AuthService,
    ) { }
 
  ngOnInit() {
    this.form = new ValidationManager({
      'email'     : 'required|email',
      'password'  : 'required|rangeLength:4,50',
      'repassword' : 'required|equalTo:password',
    });

    this.form.setValue({
    });

    //this.form.setErrorMessage('firstname', 'pattern', 'Pattern must be part of this family: [A-Za-z0-9.-_]');
  }
 
  /*ngOnDestroy() {
    this.notification.clear();
    'firstname' : 'required|minLength:2|maxLength:25|alphaSpace',
    'lastname'  : 'required|minLength:2|maxLength:25|alphaSpace',
    'username'  : 'required|minLength:4|pattern:[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*',
  }*/

  removeFormGroup(){
    this.form.removeChildGroup('repassword');
  }

  createUserAccount(){
    if(this.form.isValid()){
      //alert('validation pass');
      this.removeFormGroup();
      this.usermodel = this.form.getData();
      this.usermodel['isAdmin'] = this.isAdmin;
      let fullname = this.usermodel.firstname + ' ' + this.usermodel.lastname;
      console.log(this.usermodel.email); 
      this.auth.createUserWithEmailAndPassword(this.usermodel.email, this.usermodel.password)
        .then((user) => {
          //this.userService.updateUserInfo(user, fullname);
          this.notificationService.notify("success", 'Account Created', 
            'Account Successfully created, Check your email to confirm your registration');
          this.router.navigate(['/'])
        }).catch(_error => {
          this.error = _error
          this.errorMessage = this.error.message;
          this.notificationService.notify("error", 'Account Creation Failed', this.error.message);
          //this.router.navigate(['/login'])
      })
      //this.form.reset();
    }
  }

}