import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UtilsService } from 'src/app/shared/utils.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private readonly _httpClient: HttpClient, private readonly _utilService: UtilsService) { }

  registrarUsuario(parametros: any[]): Observable<HttpResponse<any>> {
    var httpParams = new HttpParams()    
		return this._httpClient.post(`${environment.apiUsuarios}/usuarios/usuario/guardar`, this._utilService.prepararObjeto(parametros),
			{
				headers: this.httpHeaders,
				observe: 'response',
			})
	}
}
