import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

    //formulario
    formGroupSignIn: FormGroup
    constructor(private _formBuilder: FormBuilder,
                private _util: UtilsService) { }
  
    ngOnInit(): void {
      this.crearFormularioSignIn()
    }
    crearFormularioSignIn() {
      this.formGroupSignIn = this._formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        /* aqui agregas los demas controles (nombreo, apelidos, fecha de nacimiento o lo que quieras) */
        password: new FormControl('', [Validators.required])
      })
  
    }
  
    get f() { return this.formGroupSignIn.controls }
  
    signIn(){
      let params: any[] = []
    
      Object.keys(this.f).forEach(key => {
        if (key === 'username' || key === 'password') {
          if (Boolean(this.f[key].value)) {
            params.push({ parametro: key, valor: this.f[key].value })
          }
        }
      })
      console.log(params)
      
      /* mandas llamar tu service
      this._util.Nombre(params).subscribe(res => {
  
      }, err => {
  
      }) */
    }
  
  
  }
  