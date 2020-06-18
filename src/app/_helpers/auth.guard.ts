import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const principal = this.authService.getPrincipalObject();

        if(principal) {
            if(route.data.roles && !this.authService.hasRole(route.data.roles)) {
                this.router.navigate(['/']);
                console.log('Access Denied!');
                return false;
            }

            return true;
        }

        this.router.navigate(['/login']);
        return true;
    }

}