import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable()
export class FakeApiEditarDatosInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { method, url, params, body } = request
    console.log(url)


    switch (true) {
      // lista
      case url.match(/([/]usuarios[/]usuario[/]referencia[/])[0-9]+$/) && method === 'GET':
        return recuperarInfoUsuario()

      case url.match(/([/]usuarios[/]usuario[/]actualizar[/])[0-9]+$/) && method === 'PUT':
        return actualizarInfoUsuario()

      default:
        return next.handle(request);
    }


    function recuperarInfoUsuario(resp = 0) {
      if (resp === 0) {
        return of(new HttpResponse({
          status: 200,
          body: {
            nombres: "Ricardo",
            apellido_paterno: "Flores",
            apellido_materno: "Lima",
            fecha_nacimiento: '1999-22-02',
            sexo: 0,
            pais: "Mexico",
            contraseña: "richardo69cool",
            correo_electronico: "ricardocool@gmail.com",
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

    function actualizarInfoUsuario(resp = 1) {
      if (resp === 0) {
        return of(new HttpResponse({
          status: 200,
          body: {
            ok: 'informacion actualizada'
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

export const fakeApiEditarDatosInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeApiEditarDatosInterceptor,
  multi: true
}