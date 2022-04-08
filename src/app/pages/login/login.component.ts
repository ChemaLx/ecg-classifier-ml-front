import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //formulario
  formGroupLogin: FormGroup
  constructor(private _formBuilder: FormBuilder,
              private _util: UtilsService) { }

  ngOnInit(): void {
    this.crearFormularioLogIn()
  }
  crearFormularioLogIn() {
    this.formGroupLogin = this._formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

  }

  get f() { return this.formGroupLogin.controls }

  signIn(){
    let params: any[] = []
  
    Object.keys(this.f).forEach(key => {
      if (key === 'username' || key === 'password') {
        if (Boolean(this.f[key].value)) {
          params.push({ parametro: key, valor: this.f[key].value })
        }
      }
    })
    
    this._util.SignIn(params).subscribe(res => {

    }, err => {

    })
  }


}
