import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AUTH_URL, LOGIN, MSG_NOT_AUTHORIZED} from "./consts";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq= req.clone()
    const token = this.authService.getToken()
    if (token) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }

    return next.handle(newReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            // console.log("Server response")
          }

        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 403) {
              console.log(error.message)
              this.toastr.warning(MSG_NOT_AUTHORIZED)
              this.router.navigate([AUTH_URL, LOGIN])
            }
          }
        }
      )
    )


  }
}
