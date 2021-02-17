import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { AppComponent} from '../app.component';

@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url == 'http://phenixid-test.francecentral.cloudapp.azure.com/api/authentication/b9bc1588-fdef-43eb-b866-329a42cbaa77?tenant=sso2') {
        const new_request = new HttpRequest('GET', request.url);
        const customReq = request.clone({});
        const customReqReplace = new_request.clone({
            setParams: {
                'grant_type': 'authorization_code',
                'client_id': 'app1',
                'redirect_uri': 'http://localhost:4200',
                'client_secret': 'cisco123',
                'code': request.body.get('code')
            },
        });
        return next.handle(customReqReplace);
    } else return next.handle(request);
    }
}