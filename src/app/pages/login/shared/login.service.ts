import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../../../shared/utils.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private _httpClient: HttpClient, private readonly _utilService: UtilsService) { }

  iniciarSesion(parametros: any[]): Observable<HttpResponse<any>> {
	  console.log(parametros)
	console.log(this._utilService.prepararObjeto(parametros))
	return this._httpClient.post(`${environment.apiUsuarios}/usuarios/usuario/inicio-sesion`, this._utilService.prepararObjeto(parametros),
		{
			headers: this.httpHeaders,
			observe: 'response',
		}
		).pipe(map(resp => this._utilService.handleResponse(resp), this)
		).pipe(catchError(error => this._utilService.handleError(error)))
	}
}
