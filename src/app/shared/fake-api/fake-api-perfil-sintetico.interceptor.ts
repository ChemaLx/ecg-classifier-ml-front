import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';



@Injectable()
export class FakeApiPerfilSinteticoInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { method, url, params, body } = request
    console.log(url)


    switch (true) {
      // lista
      case url.endsWith('/usuario/procesamiento/clasificar/json/') && method === 'GET':
        return recuperarAclaracionesPorFiltros()



      default:
        return next.handle(request);
    }


    function recuperarAclaracionesPorFiltros(resp = 0) {
      if (resp === 0) {
        return of(new HttpResponse({
          status: 200,
          body: { FAAclaraciones: 'uoeauao' }
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


export const fakeApiPerfilSinteticoInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeApiPerfilSinteticoInterceptor,
  multi: true
}
