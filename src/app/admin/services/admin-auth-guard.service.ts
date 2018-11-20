import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/helpers/user.service';
import { AuthService } from '../../shared/helpers/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    //from above we got the firebase app user object not our database user object.
    // we must go to user service to define a method for reading user.
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
  }

}
