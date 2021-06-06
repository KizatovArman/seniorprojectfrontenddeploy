import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckerGuardService {

  constructor(
    private _authService: AuthService,
    private _router:Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authService.getToken()) {
      return true;
    }
// navigate to home page
    this._router.navigate(['/home']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
