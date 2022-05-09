import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable()
export class FakeApiNuevoEcgInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { method, url, params, body } = request
    console.log(url)


    switch (true) {
      // lista
      case url.endsWith('/usuario/procesamiento/procesar/json/') && method === 'POST':
        return procesarNuevoEcg()
      case url.endsWith('/recuperar/datos/usuario/') && method === 'GET':
        return recuperarDatosUsuario()



      default:
        return next.handle(request);
    }


    function procesarNuevoEcg(resp = 0) {
      if (resp === 0) {
        return of(new HttpResponse({
          status: 200,
          body: { clasificacion_arritmia: '0' }
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

    function recuperarDatosUsuario(resp = 0) {
      if (resp === 0) {
        return of(new HttpResponse({
          status: 200,
          body: {
            edad: 29,
            sexo: 0,
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


export const fakeApiNuevoEcgInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeApiNuevoEcgInterceptor,
  multi: true
}
