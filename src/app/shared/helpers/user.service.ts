import { AppUser } from 'shared/models/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
  }

  updateUserInfo(user: firebase.User, name?, phoneNumber?, address?) {
    this.db.object('/users/' + user.uid).update({
      //name: objectValue.firstname + objectValue.lastname,
      name: name,
      phoneNumber: phoneNumber,
      address: address
      //password: user.updatePassword(password)
    });
  } 
 
  get(uid: string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' + uid);
  }

} 