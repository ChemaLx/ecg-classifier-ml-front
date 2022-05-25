import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilsService } from 'src/app/shared/utils.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  //formulario
  formGroupSignIn: FormGroup
  ultimoDia = dayjs().format('YYYY-MM-DD')
  constructor(private _formBuilder: FormBuilder,
    private _util: UtilsService) { }

  ngOnInit(): void {
    this.crearFormularioSignIn()
  }
  crearFormularioSignIn() {
    this.formGroupSignIn = this._formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required])
    })

  }

  get f() { return this.formGroupSignIn.controls }

  signIn() {
    let params: any[] = []

    Object.keys(this.f).forEach(key => {
      if (key === 'nombre' || key === 'apellidoPaterno' || key === 'apellidoMaterno' || key === 'edad' || key === 'username' || key === 'contrasena' || key === 'sexo' || key === 'email') {
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
