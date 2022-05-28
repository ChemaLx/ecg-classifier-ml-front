import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UtilsService } from 'src/app/shared/utils.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private readonly _httpClient: HttpClient, private readonly _utilService: UtilsService) { }

  recuperarInformacionPersonal(idUsuario): Observable<HttpResponse<any>> {
		return this._httpClient.get(`${environment.apiUsuarios}/usuarios/usuario/recuperar/info/${localStorage.getItem('idUsuario')}`,
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		).pipe(map(resp => this._utilService.handleResponse(resp), this)
		).pipe(catchError(error => this._utilService.handleError(error)))
	}


  guardarNuevosDatos(parametros): Observable<HttpResponse<any>> {
	  console.log(this._utilService.prepararObjeto(parametros))
		return this._httpClient.put(`${environment.apiUsuarios}/usuarios/usuario/actualizar/${localStorage.getItem('idUsuario')}`, this._utilService.prepararObjeto(parametros), 
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		).pipe(map(resp => this._utilService.handleResponse(resp), this)
		).pipe(catchError(error => this._utilService.handleError(error)))
	}
}
