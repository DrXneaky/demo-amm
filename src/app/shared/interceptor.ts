import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url == 'http://phenixid-test.francecentral.cloudapp.azure.com/api/authentication/cb169470-1440-4429-aa40-d3dd78320dfc?tenant=dummy') {
        console.log("type",typeof(request.body));
        console.log("body",request.body.get('code'));
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