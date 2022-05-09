import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'
import ld from 'lodash'
import { NuevoEcgService } from './shared/nuevo-ecg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-ecg',
  templateUrl: './nuevo-ecg.component.html',
  styleUrls: ['./nuevo-ecg.component.css']
})
export class NuevoEcgComponent implements OnInit {

  ultimoDia = dayjs().format('YYYY-MM-DD')
  ritmoCardiacoSlider = 60
  formGroupNuevoEcg: FormGroup
  formGroupNuevoEcgPorLotes: FormGroup

  //respustas api
  datosUsuario = {}


  //banderas
  isEcgPropio = false
  isNotEcgPropio = false
  isClasificacionLista = false
  isClasificacionFailed = false
  isCargando = false
  isCargandoIngformacionUsuarioSuccess = false
  isCargaError = false

  constructor(private readonly _nuevoEcgService: NuevoEcgService,
    private readonly _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.crearFormularioNuevoEcg()
    this.crearFormularioNuevoEcgPorLotes()
    console.log(this.ultimoDia)
  }

  cambiarForm(estado: boolean){
    if(estado){
      this.isEcgPropio = true
      this.isNotEcgPropio = false
      this._nuevoEcgService.recuperarDatosUsuario().subscribe(res => {
        this.isCargandoIngformacionUsuarioSuccess = true
        this.datosUsuario = res.body
        if(this.datosUsuario['sexo'] == 0){
          this.formGroupNuevoEcg.controls['sexo'].setValue('Masculino');   
        }
        else {
          this.formGroupNuevoEcg.controls['sexo'].setValue('Femenino');  
        }
        this.formGroupNuevoEcg.controls['edad'].setValue(this.datosUsuario['edad']);
        console.log(this.datosUsuario)
      })

    }
    if(!estado){
      this.isEcgPropio = false
      this.isNotEcgPropio = true
    }
  }
  crearFormularioNuevoEcg() {
    this.formGroupNuevoEcg = this._formBuilder.group({
      
      
      edad: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      inicioAnalisis: new FormControl('', [Validators.required]),
      finAnalisis: new FormControl('', [Validators.required]),
      intervaloAnalisis: new FormControl('', [Validators.required]),
      /* electrocardiograma: new FormControl('', [Validators.required]), */
      
    })
    /* this.formGroupNuevoEcg.controls['ritmoCardiaco'].setValue(60); */

  }

  get f() { return this.formGroupNuevoEcg.controls }
  
  crearFormularioNuevoEcgPorLotes() {
    this.formGroupNuevoEcgPorLotes = this._formBuilder.group({
      
      
      nombre: new FormControl('', [Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      inicioAnalisis: new FormControl('', [Validators.required]),
      finAnalisis: new FormControl('', [Validators.required]),
      intervaloAnalisis: new FormControl('', [Validators.required]),

      /* electrocardiograma: new FormControl('', [Validators.required]), */
      
    })

  }

  get ff() { return this.formGroupNuevoEcgPorLotes.controls }

  limpiarFormulario() {
    this.formGroupNuevoEcg.reset()
  }

  cargarNuevoEcg(){
    this.isClasificacionLista = false
    this.isCargando = true
    const parametros = []

    if(this.isEcgPropio){}
    Object.keys(this.f).forEach(key => {
      if (key === 'edad' || key === 'inicioAnalisis' || key === 'finAnalisis' || key === 'intervaloAnalisis') {
        if (Boolean(this.f[key].value)) {
          parametros.push({ parametro: ld.snakeCase(key), valor: this.f[key].value })
        }
      }
      if (key === 'sexo') {
        if (Boolean(this.f[key].value == 'Femenino')) {
          parametros.push({ parametro: 'sexo', valor: '1' })
        }
        else if (Boolean(this.f[key].value == 'Masculino')) {
          parametros.push({ parametro: 'sexo', valor: '0' })
        }
      }
    })
    if(this.isNotEcgPropio){
      Object.keys(this.ff).forEach(key => {
        if (key === 'nombre' || key === 'apellidoPaterno' || key === 'apellidoMaterno' || key === 'edad' ||  key === 'edad' || key === 'inicioAnalisis' || key === 'finAnalisis' || key === 'intervaloAnalisis') {
          if (Boolean(this.ff[key].value)) {
            parametros.push({ parametro: ld.snakeCase(key), valor: this.ff[key].value })
          }
        }
        if (key === 'sexo') {
            parametros.push({ parametro: 'sexo', valor: this.ff[key].value })
        }
      })
    }

    console.log(parametros)
    this._nuevoEcgService.nuevoRegistroEcg(parametros).subscribe(res => {
      //this.limpiarFormulario()
      this.isCargando = false
      this._router.navigate(['/dashboard'])
      
      
    }, err => {
      //this.error = err.error.details
      this.isCargaError = true
      this.isCargando = false
      
    })
  }

  
}
