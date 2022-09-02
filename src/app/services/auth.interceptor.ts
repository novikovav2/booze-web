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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {  }

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
