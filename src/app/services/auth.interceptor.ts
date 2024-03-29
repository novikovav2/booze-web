import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq= req.clone()
    const token = this.authService.getToken()
    if (token) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.id}`)
      })
    }
    return next.handle(newReq)
  }
}
