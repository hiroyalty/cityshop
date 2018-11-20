import { UserService } from './user.service';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase';
 
@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  public userDetails: firebase.User;
  public loadUser: AppUser;
  
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) {
      //this.afAuth.authState.subscribe(user => this.user = user);
      this.user$ = afAuth.authState;

      // this.user$.subscribe(
      //   (user) => {
      //     if (user) {
      //       this.userDetails = user;
      //       //console.log(this.userDetails);
      //     }
      //     else {
      //       this.userDetails = null;
      //     }
      //   }
      // );
  }

  returnURLSetter() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  redirectOnLoggedIn() {
    let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

    localStorage.removeItem('returnUrl');
    this.router.navigateByUrl(returnUrl);
  }

  loginGoogle() {
    this.returnURLSetter();

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginFacebook() {
    this.returnURLSetter();

    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  loginEmail(email, password) {
    this.returnURLSetter();
    
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  createUserWithEmailAndPassword(email, pass) {
    this.returnURLSetter();

    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
    .switchMap(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return this.userService.get(user.uid);
      } else {
      return Observable.of(null);
      }
    });
  }

  loadAppUser(): AppUser {
    this.appUser$.subscribe(aUser => {
      this.loadUser = aUser;
    });
    return this.loadUser;
  }


  /*get isUserAnonymousLoggedIn(): boolean {
    return (this.user$ !== null) ? this.user$.isAnonymous : false
  }*/
 
  get currentUserId(): string {
    console.log('current user id from auth '+ this.user$['uid'])
    return (this.user$ !== null) ? this.user$['uid'] : ''
  }
 
  get currentUserName(): string {
    return (this.user$ !== null) ? this.user$['displayName'] : ''
    //return (this.userDetails !== null) ? this.userDetails['displayName'] : ''
  }

  get currentUserEmail(): string {
    return (this.user$ !== null) ? this.user$['email'] : ''
    //return (this.userDetails !== null) ? this.userDetails['email'] : ''
  }
 
  get currentUser(): any {
    //return (this.user$ !== null) ? this.user$ : null;
    //var userp = firebase.auth().currentUser;
    let user = this.afAuth.auth.currentUser;
    return user;
  }
 
  get isUserLoggedIn(): boolean {
    //if ((this.user$ !== null) && (!this.isUserAnonymousLoggedIn)) {
    if (this.user$ == null ) {
      return false;
    } else {
      return true;
    }
  }

}
