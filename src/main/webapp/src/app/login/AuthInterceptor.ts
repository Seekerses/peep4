import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService: LoginService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.loginService.getUser();
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Basic ' + btoa(currentUser.username + ':' + currentUser.password)
        }
      });
    }
    request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '/'
      }
    });

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log('Server response');
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('Unauthorized');
              this.loginService.logout();
              this.router.navigate(['']);
            }
          }
        }
      )
    );
  }

}
