import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthStore } from './auth.store';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private authStore: AuthStore) { }

    private addJsonHeader(headers: HttpHeaders): void {
        headers.append('Content-Type', 'application/json');
    }

    private authorizationToken(headers: HttpHeaders): void {
        if (this.authStore.getToken()) {
            headers.append('Authorization', `Bearer ${this.authStore.getToken()}`);
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request.headers.append('Content-Type', 'application/json');
        request.headers.append("Access-Control-Allow-Origin", "*")

        // if the token is  stored in localstorage add it to http header
        if (this.authStore.isUserAuthenticated()) {
            //clone http to the custom AuthRequest and send it to the server 
            const AuthRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authStore.getToken()}`
                },
            });
            return next.handle(AuthRequest)
        } else {
            return next.handle(request);
        }
    }
}
