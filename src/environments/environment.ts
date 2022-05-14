// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isMockEnabled: true,
  
	api: 'http://acbb-189-208-208-239.ngrok.io',

	isMockApiPerfilSintetico: false,
	isMockApiIniciarSesion: false,
	isMockApiEditarDatosInterceptor: false,
	isMockApiHistorialInterceptor: false,
	isMockApiNuevoEcgInterceptor: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
