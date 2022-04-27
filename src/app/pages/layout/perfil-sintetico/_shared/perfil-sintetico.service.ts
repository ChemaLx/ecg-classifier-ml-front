import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilSinteticoService {

  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private readonly _httpClient: HttpClient) { }

  probarPerfilSintetico(fechaNacimiento: string, sexo: boolean, ritmoCardiaco): Observable<HttpResponse<any>> {
		return this._httpClient.get(`${environment.api}/usuario/procesamiento/clasificar/json/`,
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		)
	}
}
