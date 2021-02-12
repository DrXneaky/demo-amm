import { Component } from '@angular/core';
//import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
//import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc-codeflow';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

//export const userInfoEndpoint = 'https://dev-7559934.okta.com/oauth2/default/v1/userinfo';
//export const userInfoEndpoint = 'https://aa-iam-node2.westeurope.cloudapp.azure.com/api/authentication/userinfo?tenant=myapp';


export const authConfig2: AuthConfig = {

  // Url of the Identity Provider
  //issuer: 'https://dev-7559934.okta.com/oauth2/default',
  //issuer: "https://dev-u1c-i8uh.eu.auth0.com/",
  issuer: 'http://phenixid-test.francecentral.cloudapp.azure.com:443/myapp',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  //clientId: 'k6N0Zppt5EUD9ACAgBe8zKLSCzO12Zx8',
  //clientId: '0oa3u6uiqhpejwwBh5d6',
  clientId: 'app1',
  dummyClientSecret: 'cisco123',
  //dummyClientSecret: 'agDqQB_iHOFpN-Fkbdva-OEddul2z5lq62bXRgQn8-FqKos-TiOC0lhW4iyIRUqT',
  responseType: 'code',
  scope: 'openid',
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

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.oauthService.configure(authConfig2);
    //this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin().then(_ => {
      console.log("");
    }).catch(err => {
      console.log("Unable to login");
      console.log(err);
    })
  }

  login() {
    this.oauthService.initImplicitFlow();
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
    //console.log('claims', claims);
    return claims['sub'];
    //return claims['first_name'];
  }

  getInfo() {
    //const info = this.oauthService.loadUserProfile();
    const token = this.oauthService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }),
    };
    this.userInfo(httpOptions).subscribe(
      (data: any) => {
        console.log('userinfo', data);
      }
    );
    //console.log('info', info);
  }

  userInfo(httpOptions): Observable<any> {
    const uri = this.oauthService.userinfoEndpoint;
    return this.http.post<any>(uri, "", httpOptions);
  }
}
