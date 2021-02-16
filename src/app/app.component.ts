import { Component } from '@angular/core';
//import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
//import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc-codeflow';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authConfig2: AuthConfig = {
  issuer: 'http://phenixid-test.francecentral.cloudapp.azure.com/dummy',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: 'app1',
  dummyClientSecret: 'cisco123',
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
      console.log("logged In");
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
    console.log('token', token);
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
    console.log('userInfoEndpoint', uri);
    return this.http.post<any>(uri, "", httpOptions);
  }

  /* exchancheCodeForToken(code){
    const tokenEndpt = this.oauthService.tokenEndpoint;
    console.log("token endpoint",tokenEndpt);
    const uri = 'http://phenixid-test.francecentral.cloudapp.azure.com/api/authentication/cb169470-1440-4429-aa40-d3dd78320dfc?tenant=dummy&grant_type=authorization_code&code=' + code + '&redirect_uri=http://localhost:4200&client_id=app1&client_secret=cisco123';
    return this.http.post<any>(uri, "");
  } */

  /* logToken(code) {
    this.exchancheCodeForToken(code).subscribe(
      (data: any) => {
        console.log(data.access_token);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('id_token', data.id_token);
      }, (error) => {
        console.log(error);
      }
    )
  } */
}
