import { UserService } from './shared/helpers/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/helpers/auth.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//export class AppComponent implements OnDestroy {
//implementing OnDestroy helps us unsubscribe from the obervable

export class AppComponent {

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
     auth.user$.subscribe(user => {
       if (!user) return;

       userService.save(user);

       let returnUrl = localStorage.getItem('returnUrl');
       if (!returnUrl) return;

       localStorage.removeItem('returnUrl');
       router.navigateByUrl(returnUrl);
     });
  }

}
