import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {AUTH_URL, LOGIN, MSG_NOT_AUTHORIZED} from "./consts";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(@Inject(AuthService) private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.getToken()) {
      return true
    } else  {
      this.toastr.warning(MSG_NOT_AUTHORIZED)
      this.router.navigate([AUTH_URL, LOGIN])
      return false
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }

}
