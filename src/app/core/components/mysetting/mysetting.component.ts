import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'shared/helpers/notification.service';
import { UserService } from 'shared/helpers/user.service';
import { AuthService } from 'shared/helpers/auth.service';
import { ValidationManager } from 'ng2-validation-manager';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs/Observable';
//import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-mysetting',
  templateUrl: './mysetting.component.html',
  styleUrls: ['./mysetting.component.css']
})
export class MysettingComponent implements OnInit {
  updateform;
  isAdmin: boolean = false;
  errorMessage: string;
  error: {name: string, message: string} = {name: '', message: ''};

  //authState: firebase.User = null;
  authState: AppUser;
  curUser: AppUser;
  //curUser: {};
  userId: string;

  updateProfile: boolean = true;
  changepassword: boolean = false;
  updateAddress: boolean = false;
  displayAddress: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private auth: AuthService
  ) { 
    this.auth.user$.subscribe(apUser => {
      this.authState = apUser
    });
    //this.userService.get(this.authState['uid']).map(user => this.curUser = user);
    //this.curUser = this.auth.currentUser;
    console.log('The current user is '+ this.auth.currentUser['displayName']); //
  }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {this.curUser = appUser});
    //this.curUser = this.auth.loadAppUser();
    console.log(this.curUser);
  }

  /* End of profile to games*/
  activateProfile() {
    this.allFalse();
    this.updateProfile = true;
    //console.log('profile is true');
  }
  activatePassword() {
    this.allFalse();
    this.changepassword = true;
    //console.log('profile is false');
  }
  activateAddress() {
    this.allFalse();
    this.updateAddress = true;
  }

  allFalse() {
    this.updateProfile = false; 
    this.changepassword = false;
    this.updateAddress = false;
  }

  showaddress() {
    this.displayAddress = !this.displayAddress;
  }

  updateprofile(fprofile: NgForm) {
    //console.log('user id is ' + this.authState['uid']);
    //console.log('Address is ' + JSON.stringify(fprofile.value.address));
    this.userService.get(this.authState['uid']).update({
      name: fprofile.value.name,
      phoneNumber: fprofile.value.phonenumber
    }).then(() => {
      // var user = firebase.auth().currentUser;
      this.auth.currentUser.updateProfile({
      displayName: fprofile.value.name,
      phoneNumber: fprofile.value.phonenumber,
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Update successful.
        console.log('success updating firebase user profile');
      }).catch(error => {
        // An error happened.
        console.log('failure updating firebase user profile');
      });
      console.log('success');
      this.notificationService.notify("success", "Update Success", "Profile Updated Succefully");
    })
    .catch(_error => {
      this.error = _error; 
      this.errorMessage = this.error.message;
      this.notificationService.notify("error", "Update Error", this.errorMessage);
    })
  }

  updateaddress(faddress: NgForm) {
    //console.log('user id is ' + this.authState['uid']);
    //console.log('Address is ' + JSON.stringify(faddress.value.address));
    this.userService.get(this.authState['uid']).update({
      address: faddress.value.address
    }).then(() => {
      // var user = firebase.auth().currentUser;
      this.auth.currentUser.updateProfile({
        address: faddress.value.address
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Update successful.
        console.log('success updating firebase user address');
      }).catch(error => {
        // An error happened.
        console.log('failure updating firebase user address');
      });
      console.log('success');
      this.notificationService.notify("success", "Update Success", "Address Updated Succefully");
    })
    .catch(_error => {
      this.error = _error; 
      this.errorMessage = this.error.message;
      this.notificationService.notify("error", "Update Error", this.errorMessage);
    })
  }

  /*updatechangepassword(f: NgForm) {
    console.log(f.value);
    this.userService.updatePassword(f.value)
      .subscribe(data => {
        this.notificationService.notify("success", 'Update Successful',
          'Password update is Successful');
    },
    errorMessage => {
      this.notificationService.notify("error", 'Update Failed', 'Your Update Failed');
      this.errorMessage = <any>errorMessage
    });
  }*/

    //this.af.auth.take(1).subscribe(auth => {
    //this.authState = auth;
    //}

    //this.authState.updateProfile(profile:{
    //}).then(() =>
    //).catch({
    //})

}
