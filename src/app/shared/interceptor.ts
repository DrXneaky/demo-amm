import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const customReq = request.clone({
            setHeaders: {
                "Access-Control-Allow-Origin": `*`
            }

        });
        return next.handle(customReq);
    }
}