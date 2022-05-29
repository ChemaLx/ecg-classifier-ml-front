import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import datos_ECG from './data/fa-ecg-class.json'

@Injectable()
export class FakeApiHistorialInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { method, url, params, body } = request
    console.log(url)


    switch (true) {
      // lista
      case url.match(/([/]procesamiento[/]historial[/])[0-9]+$/) && method === 'GET':
        return recuperarHistorial()
      case url.match(/([/]procesamiento[/]historial[/]clasificacion[/])[0-9]+$/) && method === 'GET':
        return recuperarClasificacion()

      default:
        return next.handle(request);
    }


    function recuperarHistorial(resp = 0) {
      if (resp === 0) {
        return of(new HttpResponse({
          status: 200,
          body: {
            historial: [
              {
                idAnalisis: '1',
                duracion: 30,
                fecha: '2020-12-13'
              },
              {
                idAnalisis: '2',
                duracion: 15,
                fecha: '2020-2-25'
              },
              {
                idAnalisis: '3',
                duracion: 15,
                fecha: '2020-4-26'
              },
              {
                idAnalisis: '4',
                duracion: 30,
                fecha: '2020-12-13'
              },
              {
                idAnalisis: '5',
                duracion: 30,
                fecha: '2020-12-13'
              },
              {
                idAnalisis: '6',
                duracion: 30,
                fecha: '2020-12-13'
              },
              {
                idAnalisis: '7',
                duracion: 30,
                fecha: '2020-12-13'
              },

            ]
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
    function recuperarClasificacion(resp = 0) {
      if (resp === 0) {
        return of(new HttpResponse({
          status: 200,
          body: datos_ECG 
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

export const fakeApiHistorialInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeApiHistorialInterceptor,
  multi: true
}