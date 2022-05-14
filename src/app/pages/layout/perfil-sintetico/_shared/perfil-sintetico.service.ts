import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UtilsService } from 'src/app/shared/utils.service';
@Injectable({
  providedIn: 'root'
})
export class PerfilSinteticoService {

  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Credentials': 'true'


	});

  constructor(private readonly _httpClient: HttpClient, private readonly _utilService: UtilsService) { }

  probarPerfilSintetico(parametros: any[]): Observable<HttpResponse<any>> {
	  console.log(this._utilService.prepararObjeto(parametros))
		return this._httpClient.post(`${environment.api}/`, this._utilService.prepararObjeto(parametros),
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		).pipe(map(resp => this._utilService.handleResponse(resp), this)
		).pipe(catchError(error => this._utilService.handleError(error)))
	}
}
