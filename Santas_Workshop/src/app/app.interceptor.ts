import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ErrorService } from "./core/error/error.service";
import { Router } from "@angular/router";


@Injectable()
class AppInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    if (token) {
      req = req.clone({
        headers: req.headers.set('X-Authorization', token)
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth/login'])
        } else {
          this.errorService.setError(err)
          this.router.navigate(['/error'])
        }
        return [err];
      })
    );
  }
}

export const appInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
