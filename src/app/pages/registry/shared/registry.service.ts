import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UtilsService } from 'src/app/shared/utils.service';

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
	console.log(this._utilService.prepararObjeto(parametros))
		return this._httpClient.post('/usuarios/usuario/guardar', this._utilService.prepararObjeto(parametros),
			{
				headers: this.httpHeaders,
				observe: 'response',
			})
	}
}
