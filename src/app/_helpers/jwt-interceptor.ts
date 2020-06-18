import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Principal } from '../_models/Principal';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
         const principal = this.authService.getPrincipalObject();
         const isLoggedIn = principal && principal.token;
         const isApiUrl = request.url.startsWith(environment.apiUrl);

         if(isLoggedIn && isApiUrl) {
             request = request.clone({
                 setHeaders: {
                     'Authorization': `Bearer ${principal.token}`
                 }
             });
         }

        return next.handle(request);
    }
}