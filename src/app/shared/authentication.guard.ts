import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor (private oauthService: OAuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.oauthService.hasValidAccessToken()) {
      console.log('valid token');
      return true;
    }
    this.router.navigate (['/']);
    console.log('no valid token');
    return false;
  }
  
}
