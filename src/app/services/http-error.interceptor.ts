import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {AUTH_URL, LOGIN, MSG_CLIENT_SIDE_ERROR, MSG_ERROR, MSG_NOT_AUTHORIZED} from "./consts";
import {Router} from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService,
              private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.error && error.error instanceof ErrorEvent) {
            // client-side error
            this.toastr.warning(MSG_CLIENT_SIDE_ERROR, MSG_ERROR)
          } else {
            // server-side error
            if (error.status === 403) {
              this.toastr.warning(MSG_NOT_AUTHORIZED)
              this.router.navigate([AUTH_URL, LOGIN])
            }

            if (error.error.text) {
              this.toastr.error(error.error.text, MSG_ERROR)
            } else {
              this.toastr.error(MSG_ERROR)
              console.log(error.error)
            }
          }
          return throwError(error.error)
        })
      )
  }
}
