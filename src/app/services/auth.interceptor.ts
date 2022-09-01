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
import {AUTH_TOKEN} from "./consts";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = ''
    const tokenStr = localStorage.getItem(AUTH_TOKEN)
    if (tokenStr) {
      token = JSON.parse(tokenStr).token
    }
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log("Server response")
          }

        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log("401")
            }
          }
        }
      )
    )


  }
}
