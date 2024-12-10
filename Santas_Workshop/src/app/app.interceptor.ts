import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    console.log(token)

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('X-Authorization', token)  // Add token to the X-Authorization header
      });

      console.log('Cloned Request with Token:', clonedRequest);
      return next.handle(clonedRequest);  // Forward the cloned request with the added token
    }

    // If no token is found, continue with the original request
    console.log('No token')
    return next.handle(req);
  }
}

export const appInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true, 
};
