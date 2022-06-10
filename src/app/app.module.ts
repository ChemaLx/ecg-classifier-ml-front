import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { DigitOnlyModule } from '@uiowa/digit-only';
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es')

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistryComponent } from './pages/registry/registry.component';
import { NavbarComponent } from './pages/layout/navbar/navbar.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { EditComponent } from './pages/edit/edit.component';
import { NuevoEcgComponent } from './pages/nuevo-ecg/nuevo-ecg.component';
import { PerfilSinteticoComponent } from './pages/layout/perfil-sintetico/perfil-sintetico.component';
import { NavbarComercialComponent } from './pages/layout/navbar-comercial/navbar-comercial.component';
import { PanelControlComponent } from './pages/panel-control/panel-control.component';
import { HistorialComponent } from './pages/historial/historial.component';

import { fakeApiLoginInterceptor } from './shared/fake-api/fake-api-login.interceptor';
import { fakeApiEditarDatosInterceptor } from './shared/fake-api/fake-api-editar-datos.interceptor';
import { fakeApiHistorialInterceptor } from './shared/fake-api/fake-api-historial.interceptor';
import { fakeApiNuevoEcgInterceptor } from './shared/fake-api/fake-api-nuevo-ecg.interceptor';
import { fakeApiPerfilSinteticoInterceptor } from './shared/fake-api/fake-api-perfil-sintetico.interceptor';
import { fakeRegistroinInterceptor } from './shared/fake-api/fake-api-registro.interceptor';
import { AutGuard } from './shared/guards/aut.guard';
import { AutLoggedGuard } from './shared/guards/aut-logged.guard';
import { BlockUIModule } from 'ng-block-ui';
import { ErrorComponent } from './pages/layout/error/error.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'inicio',
		component: HomeComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AutLoggedGuard],
	},
	{
		path: 'signup',
		component: RegistryComponent,
		canActivate: [AutLoggedGuard],
	},
	{
		path: 'panel',
		component: PanelControlComponent,
		canActivate: [AutGuard],
	},
	{
		path: 'historial',
		component: HistorialComponent,
		canActivate: [AutGuard],
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AutGuard],
	},
	{
		path: 'editar',
		component: EditComponent,
		canActivate: [AutGuard],
	},
	{
		path: 'nueva-clasificacion',
		component: NuevoEcgComponent,
		canActivate: [AutGuard],
	},
	{
		path: '**',
		component: ErrorComponent
	  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    RegistryComponent,
    FooterComponent,
    EditComponent,
    PerfilSinteticoComponent,
    NavbarComercialComponent,
    PanelControlComponent,
    HistorialComponent,
    NuevoEcgComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(routes),
    FormsModule,
	ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
	BrowserAnimationsModule,
	NgxSliderModule,
	NgxTrimDirectiveModule,
	DigitOnlyModule,
	BlockUIModule.forRoot()
  ],
  providers: [
	  environment.isMockApiPerfilSintetico ? [fakeApiPerfilSinteticoInterceptor] : [],
	  environment.isMockApiIniciarSesion ? [fakeApiLoginInterceptor] : [],
	  environment.isMockApiEditarDatosInterceptor ? [fakeApiEditarDatosInterceptor] : [],
	  environment.isMockApiHistorialInterceptor ? [fakeApiHistorialInterceptor] : [],
	  environment.isMockApiNuevoEcgInterceptor ? [fakeApiNuevoEcgInterceptor] : [],
	  environment.isMockApiRegistroInterceptor ? [fakeRegistroinInterceptor] : [],
	  AutGuard,
	  AutLoggedGuard,
	  {provide: LOCALE_ID, useValue: 'es'}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
