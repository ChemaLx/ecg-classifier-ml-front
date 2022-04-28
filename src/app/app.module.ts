import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistryComponent } from './pages/registry/registry.component';
import { NavbarComponent } from './pages/layout/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { EditComponent } from './pages/edit/edit.component';
import { PerfilSinteticoComponent } from './pages/layout/perfil-sintetico/perfil-sintetico.component';
import { NavbarComercialComponent } from './pages/layout/navbar-comercial/navbar-comercial.component';
import { fakeApiPerfilSinteticoInterceptor } from './shared/fake-api/fake-api-perfil-sintetico.interceptor';
import { fakeApiLoginInterceptor } from './shared/fake-api/fake-api-login.interceptor';
import { PanelControlComponent } from './pages/panel-control/panel-control.component';


const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
	},
	{
		path: 'panel',
		component: PanelControlComponent,
	},
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'registry',
		component: RegistryComponent,
	},
	{
		path: 'editar',
		component: EditComponent,
	},
	{
		path: 'inicio',
		component: HomeComponent,
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
    PanelControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(routes),
    FormsModule,
	ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
	BrowserAnimationsModule
  ],
  providers: [
	  environment.isMockApiPerfilSintetico ? [fakeApiPerfilSinteticoInterceptor] : [],
	  environment.isMockApiIniciarSesion ? [fakeApiLoginInterceptor] : [],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
