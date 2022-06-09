// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isMockEnabled: true,
  
	apiProcesamiento: 'http://127.0.0.1:8082',
	apiUsuarios: 'http://127.0.0.1:8081',
	//apiUsuarios: 'https://microservicio-usuarios-1654059817625.azurewebsites.net',

	isMockApiPerfilSintetico: false,
	isMockApiIniciarSesion: false,
	isMockApiEditarDatosInterceptor: false,
	isMockApiHistorialInterceptor: false,
	isMockApiNuevoEcgInterceptor: false,
	isMockApiRegistroInterceptor: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
