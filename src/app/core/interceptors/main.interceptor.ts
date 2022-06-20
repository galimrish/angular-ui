import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AppSnackBarComponent } from '../snack-bar/snack-bar.component';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  token: string | null = null;

  constructor(public router: Router, private snackBar: AppSnackBarComponent) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = sessionStorage.getItem('authToken');
    if (!this.token) { this.token = ''; }
    const modified = req.clone({ setHeaders: { 'Authorization': this.token } });
    return next.handle(modified).pipe(catchError((error, caught) => {
      this.handleNetError(error);
      return of(error);
    }) as any);
  }

  private handleNetError(response: HttpErrorResponse): Observable<any> {

    if (response.status) {
      let msg = '';
      try {
        msg = typeof(response.error) === 'string'
          ? JSON.parse(response.error).message
          : response.error.message;
      } catch {
        msg = response.error;
      }

      switch (response.status) {
        case 401: {
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('authData');
          this.router.navigate([`/login`]);
          break;
        }
        case 404: {
          msg = `Not found. ${msg}`;
          break;
        }
        case 409: {
          msg = `Version conflict, please refresh the page. ${msg}`;
          break;
        }
        case 503: {
          msg = `Failed to connect to server. ${msg}`;
          break;
        }
      }

      this.snackBar.openSnackBar(msg, 'red-snackbar');
      return of(response.message);
    }
    throw response;
  }
  
}
