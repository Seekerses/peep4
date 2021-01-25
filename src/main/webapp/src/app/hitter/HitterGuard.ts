import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login/login.service';

@Injectable({ providedIn: 'root' })
export class HitterGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const currentUser = this.loginService.getUser();
    if (currentUser) {
      return true;
    }
    console.log(currentUser);
    this.router.navigate(['']);
    return false;
  }
}
