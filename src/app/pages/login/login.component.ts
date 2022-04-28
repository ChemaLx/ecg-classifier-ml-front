import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/utils.service';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //formulario
  formGroupLogin: FormGroup

  //banderas 
  isCargando = false
  isLoginError = false
  constructor(private _formBuilder: FormBuilder,
              private _loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
    this.crearFormularioLogIn()
  }
  crearFormularioLogIn() {
    this.formGroupLogin = this._formBuilder.group({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required])
    })

  }

  get f() { return this.formGroupLogin.controls }

  iniciarSesion(){
    this.isCargando = true
    let params: any[] = []
    
    Object.keys(this.f).forEach(key => {
      if (key === 'usuario' || key === 'contrasena') {
        if (Boolean(this.f[key].value)) {
          params.push({ parametro: key, valor: this.f[key].value })
        }
      }
    })
    
    this._loginService.iniciarSesion(params).subscribe(res => {
      console.log(res.body)
      this.isCargando = false
      this._router.navigate(['/panel'])
    }, err => {
      this.isCargando = false
      this.isLoginError = true
    })
  }


}
