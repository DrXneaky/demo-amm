import { Component, OnInit } from '@angular/core';

import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

export const authConfig: AuthConfig = {

  issuer: 'https://dev-7559934.okta.com/oauth2/default',
  clientId: '0oa3u6uiqhpejwwBh5d6',
  responseType: 'code',
  redirectUri: window.location.origin

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService) { 
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit() {
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get name () {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

}
