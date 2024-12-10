import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// Interceptor with Injectable decorator
@Injectable()
class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted Request:', req);
    // Optionally modify the request (e.g., adding headers)
    // const clonedRequest = req.clone({      
    //   headers: req.headers.set('X-Authorization', 'your-token-here')
    // });
    // return next.handle(clonedRequest);
    return next.handle(req)
  }
}

// Provide the Interceptor in the AppModule
export const appInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true, // Ensures that this interceptor is added to the list of interceptors
};
