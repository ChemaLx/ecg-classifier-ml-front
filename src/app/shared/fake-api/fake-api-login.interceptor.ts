import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';


@Injectable()
export class FakeApiLoginInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { method, url, params, body } = request
    console.log(url)


    switch (true) {
      // lista
      case url.endsWith('/iniciar-sesion') && method === 'GET':
        return iniciarSesion()



      default:
        return next.handle(request);
    }


    function iniciarSesion(resp = 0) {
      if (resp === 0) {
        return of(new HttpResponse({
          status: 200,
          body: {
            acess_token : "ueauaoeueueueueiiid",
            refresh_token : "ieoioeioeieo432134"
          } 
        })).pipe(delay(2000))
      } else if (resp === 1) {
        return timer(2000).pipe(
          switchMap(() => throwError({
            status: 500,
            error: {
              mensaje: 'Ocurrió un error inesperado al recuperar las aclaraciones.'
            }
          }))
        )
      }
    }



  }

}

export const fakeApiLoginInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeApiLoginInterceptor,
  multi: true
}