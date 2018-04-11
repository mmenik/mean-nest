import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LayoutService } from './layout/layout.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private readonly layoutService: LayoutService,
        private readonly authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // request = request.clone({
        //     setHeaders: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        // });
        return next.handle(request).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event:', event);
                }
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        console.log('Unauthenticated redirect to login');
                        this.authService.logout();
                    }
                }
            });
    }

}
