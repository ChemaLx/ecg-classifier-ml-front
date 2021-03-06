import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UtilsService } from 'src/app/shared/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NuevoEcgService {

  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private readonly _httpClient: HttpClient, private readonly _utilService: UtilsService) { }

  nuevoRegistroEcg(parametros: any[], isClasificacionPersonal: boolean): Observable<HttpResponse<any>> {
	  if(isClasificacionPersonal){
		  return this._httpClient.post(`${environment.apiProcesamiento}/procesamiento/clasificacion-personal`, this._utilService.prepararObjeto(parametros),
			  {
				  headers: this.httpHeaders,
				  observe: 'response',
			  }
		  ).pipe(map(resp => this._utilService.handleResponse(resp), this)
		  ).pipe(catchError(error => this._utilService.handleError(error)))
	  }
		return this._httpClient.post(`${environment.apiProcesamiento}/procesamiento/clasificacion-lotes`, this._utilService.prepararObjeto(parametros),
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		).pipe(map(resp => this._utilService.handleResponse(resp), this)
		).pipe(catchError(error => this._utilService.handleError(error)))
	}


	recuperarDatosUsuario(){
		let httpParams = new HttpParams()
		return this._httpClient.get(`${environment.apiUsuarios}/usuarios/usuario/edad-sexo/${localStorage.getItem('idUsuario')}`,
			{
				headers: this.httpHeaders,
				observe: 'response',
				params: httpParams
			}
		).pipe(map(resp => this._utilService.handleResponse(resp), this)
		).pipe(catchError(error => this._utilService.handleError(error)))

	}
}
