import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutLoggedGuard implements CanActivate {

	constructor(private _router: Router) { }


	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.checkUserLogin(next, state);
	}

	canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canActivate(next, state);
	}

	checkUserLogin(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
			if(!Boolean(localStorage.getItem('idUsuario'))){
				return true
			}
			this._router.navigate(['/panel'])
			return false 
	}

}