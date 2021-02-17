import { Component } from '@angular/core';
//import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
//import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc-codeflow';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authConfig2: AuthConfig = {
  issuer: 'http://phenixid-test.francecentral.cloudapp.azure.com/sso2',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: 'app1',
  dummyClientSecret: 'cisco123',
  responseType: 'code',
  scope: 'openid profile',
  disablePKCE: true,
  showDebugInformation: true,
  postLogoutRedirectUri: window.location.origin,
  requireHttps: false,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-app 2';

  constructor(public oauthService: OAuthService, private http: HttpClient) {
    this.oauthService.configure(authConfig2);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin().then(_ => {
      console.log("logged In");
    }).catch(err => {
    })
  }

  login() {
    this.oauthService.initImplicitFlow('foobar');
    //this.oauthService.initAuthorizationCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['given_name'];
  }

  getInfo(): String {
    const info = this.oauthService.loadUserProfile();
    console.log('this is info', info);
    const token = this.oauthService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }),
    };
    this.userInfo(httpOptions).subscribe(
      (data: any) => {
        return data['given_name'];
      }, (error) => {
        return null;
      }
    );
    return null;
    //console.log('info', info);
  }

  userInfo(httpOptions): Observable<any> {
    const uri = this.oauthService.userinfoEndpoint;
    return this.http.get<any>(uri, httpOptions);
  }

}
