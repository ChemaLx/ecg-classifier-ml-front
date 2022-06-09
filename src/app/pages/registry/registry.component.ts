import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilsService } from 'src/app/shared/utils.service';
import dayjs from 'dayjs';
import { RegistryService } from './shared/registry.service';
import { Router } from '@angular/router';
import ld from 'lodash'
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})

export class RegistryComponent implements OnInit {

  //formulario
  formGroupSignIn: FormGroup
  ultimoDia = dayjs().format('YYYY-MM-DD')
  
  //banderas 
  isUsuarioCreado = false 
  isErrorCreacion = false
  isCargando = false
  isRegistroFailed = false
  isRegistroCheck = false
  
  constructor(private _formBuilder: FormBuilder,
              private _util: UtilsService,
              private _registryService: RegistryService, private _router: Router) { }

  ngOnInit(): void {
    this.crearFormularioSignIn()
  }

  crearFormularioSignIn() {
    this.formGroupSignIn = this._formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required])
    })

  }

  get f() { return this.formGroupSignIn.controls }

  signIn() {
    this.isCargando = true
    let params: any[] = []
    
    Object.keys(this.f).forEach(key => {
      if (key === 'nombre' || key === 'apellidoPaterno' || key === 'apellidoMaterno' || key === 'fechaNacimiento' || key === 'username' || key === 'contrasena' || key === 'sexo' || key === 'correoElectronico') {
        if (Boolean(this.f[key].value)) {
          params.push({ parametro: ld.snakeCase(key), valor: this.f[key].value })
        }
        
      }
    })
    console.log(params)

    this._registryService.registrarUsuario(params).subscribe(res => {
      this.isCargando = false
      this.isRegistroCheck = true
      console.log(res)
      setTimeout(() => {
        this._router.navigate(['/login'])
      }, 1200);
    }, err => {
      this.isCargando = false
      this.isRegistroFailed = true
      this.formGroupSignIn.reset()
    })




  }


}
