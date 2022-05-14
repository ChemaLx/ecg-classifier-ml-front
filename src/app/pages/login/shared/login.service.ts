import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private _httpClient: HttpClient) { }

  iniciarSesion(parametros: any[]): Observable<HttpResponse<any>> {
    var httpParams = new HttpParams()
    if (parametros != null && parametros != undefined && parametros.length != 0) {
			parametros.forEach(p => {
        console.log(p.valor)
				httpParams = httpParams.set(p.parametro, p.valor)
			})
		}
    console.log(httpParams)
    
		return this._httpClient.get('/inicio',
			{
				headers: this.httpHeaders,
				observe: 'response',
        params: httpParams
			})
	}
}
