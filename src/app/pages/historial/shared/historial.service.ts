import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UtilsService } from 'src/app/shared/utils.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private readonly _httpClient: HttpClient, private readonly _utilService: UtilsService) { }

  recuperarHistorial(idUsuario): Observable<HttpResponse<any>> {
	  console.log(idUsuario)
	  /* TODO: la uri cambiara de usuarios a ecg */
		return this._httpClient.get(`${environment.apiUsuarios}/usuarios/historial/${localStorage.getItem('idUsuario')}`,
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		).pipe(map(resp => this._utilService.handleResponse(resp), this)
		).pipe(catchError(error => this._utilService.handleError(error)))
	}
}