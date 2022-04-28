import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ModelConverterService } from './model-converter.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private _httpClient: HttpClient, private _mc: ModelConverterService) { }


  prepararObjeto(parametros: any[]) {
	let objetoFinal = new Object();

	if (parametros != null && parametros != undefined && parametros.length != 0) {
		parametros.forEach(p => {
			objetoFinal[p.parametro] = p.valor
		})
	}
	return objetoFinal
}

handleResponse(response: HttpResponse<Object>, classObject: any = null) {
	return classObject ? response.clone({ body: this._mc.toCamelCaseType(classObject, response.body) }) : response.clone({ body: this._mc.toCamelCase(response.body) })
}

handleError(error: HttpErrorResponse, classObject: any = null) {
	return throwError(new HttpErrorResponse({
		error: classObject ? this._mc.toCamelCaseType(classObject, error.error) : this._mc.toCamelCase(error.error),
		headers: error.headers,
		status: error.status,
		statusText: error.statusText,
		url: error.url
	}))
}

}
