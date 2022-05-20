import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'
import ld from 'lodash'
import { NuevoEcgService } from './shared/nuevo-ecg.service';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { ɵangular_packages_platform_browser_platform_browser_b } from '@angular/platform-browser';
import { DashboardService } from '../dashboard/shared/dashboard.service';

@Component({
  selector: 'app-nuevo-ecg',
  templateUrl: './nuevo-ecg.component.html',
  styleUrls: ['./nuevo-ecg.component.css']
})
export class NuevoEcgComponent implements OnInit {

  value: number = 0;
  highValue: number = 30;
  options: Options = {
    floor: 0,
    ceil: 30
  };

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
  isCorrectExt = false
  archivoTxt: any;
  isArchivoIncorrecto: boolean;

  constructor(private readonly _nuevoEcgService: NuevoEcgService,
              private readonly _formBuilder: FormBuilder, 
              private _router: Router,
              private readonly _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.crearFormularioNuevoEcg()
    this.crearFormularioNuevoEcgPorLotes()
    console.log(this.ultimoDia)
  }

  recuperarDatosUsuario(){
    this.isCargandoIngformacionUsuarioSuccess = false
    this._nuevoEcgService.recuperarDatosUsuario('43214324').subscribe(res => {
      this.isCargandoIngformacionUsuarioSuccess = true
      this.datosUsuario = res.body/* ['body'] */
      if (this.datosUsuario['sexo'] == 0) {
        this.formGroupNuevoEcg.controls['sexo'].setValue('Masculino');
      }
      else {
        this.formGroupNuevoEcg.controls['sexo'].setValue('Femenino');
      }
      this.formGroupNuevoEcg.controls['edad'].setValue(this.datosUsuario['edad']);
    })
  }

  cambiarForm(estado: boolean) {
    if (estado) {
      this.isEcgPropio = true
      this.isNotEcgPropio = false
      this.recuperarDatosUsuario()

    }
    if (!estado) {
      this.isEcgPropio = false
      this.isNotEcgPropio = true
    }
  }
  crearFormularioNuevoEcg() {
    this.formGroupNuevoEcg = this._formBuilder.group({
      edad: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      inicioAnalisis: new FormControl('', []),
      finAnalisis: new FormControl('', []),
      //intervaloAnalisis: new FormControl('', [Validators.required]),
      electrocardiograma: new FormControl('', []),

    })

  }

  get f() { return this.formGroupNuevoEcg.controls }

  crearFormularioNuevoEcgPorLotes() {
    this.formGroupNuevoEcgPorLotes = this._formBuilder.group({


      nombre: new FormControl('', [Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      inicioAnalisis: new FormControl('', []),
      finAnalisis: new FormControl('', []),
      /* intervaloAnalisis: new FormControl('', [Validators.required]), */
      electrocardiograma: new FormControl('', []),

    })

  }

  get ff() { return this.formGroupNuevoEcgPorLotes.controls }

  limpiarFormulario() {
    this.formGroupNuevoEcg.reset()
    this.formGroupNuevoEcgPorLotes.reset()
    if(this.isEcgPropio){
      const newLocal = (<HTMLInputElement>document.getElementById(`input-1`)).value = ""
    }
    if(this.isNotEcgPropio){
      const newLocal = (<HTMLInputElement>document.getElementById(`input-2`)).value = ""
    }
  }

  cargarNuevoEcg() {
    this.isClasificacionLista = false
    this.isCargando = true
    const parametros = []

    if (this.isEcgPropio) { }
    Object.keys(this.f).forEach(key => {
      if (key === 'edad' || key === 'electrocardiograma') {
        if (Boolean(this.f[key].value)) {
          parametros.push({ parametro: ld.snakeCase(key), valor: this.f[key].value })
        }
      }
      if (key === 'inicioAnalisis') {
        parametros.push({ parametro: ld.snakeCase(key), valor: this.value })
      }
      if (key === 'finAnalisis') {
        parametros.push({ parametro: ld.snakeCase(key), valor: this.highValue })
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
    if (this.isNotEcgPropio) {
      Object.keys(this.ff).forEach(key => {
        if (key === 'nombre' || key === 'apellidoPaterno' || key === 'apellidoMaterno' || key === 'edad' || key === 'electrocardiograma') {
          if (Boolean(this.ff[key].value)) {
            parametros.push({ parametro: ld.snakeCase(key), valor: this.ff[key].value })
          }
        }
        if (key === 'inicioAnalisis') {
          parametros.push({ parametro: ld.snakeCase(key), valor: this.value })
        }
        if (key === 'finAnalisis') {
          parametros.push({ parametro: ld.snakeCase(key), valor: this.highValue })
        }
        if (key === 'sexo') {
          parametros.push({ parametro: 'sexo', valor: this.ff[key].value })
        }
      })
    }
    

    console.log(parametros)
    this._nuevoEcgService.nuevoRegistroEcg(parametros).subscribe(res => {
      this.limpiarFormulario()
      this.isCargando = false
      console.log(res)
      this._dashboardService.ecg = res.body
      this._router.navigate(['/dashboard'])
      this.recuperarDatosUsuario()
      
    }, err => {
      //this.error = err.error.details
      this.limpiarFormulario()
      this.isCargaError = true
      this.isCargando = false
      this.recuperarDatosUsuario()

    })
  }


  onFileSelect(event) {
    this.archivoTxt = event.target.files[0];
    const fileReader = new FileReader();
    const parametros = []
    
    if (this.validateFile(this.archivoTxt.name)) {
      this.isCorrectExt = false
      fileReader.onload = (e) => {
        const ArrregloMuestrasSenial = (e.target.result as string).split('\r\n');
  
        ArrregloMuestrasSenial.forEach(element => {
          parametros.push(element)
        });
      }
      console.log(parametros)
      fileReader.readAsText(this.archivoTxt)

      if(this.isEcgPropio){
        this.formGroupNuevoEcg.controls['electrocardiograma'].setValue(parametros);
      }
      else if(this.isNotEcgPropio){
        this.formGroupNuevoEcgPorLotes.controls['electrocardiograma'].setValue(parametros);
      }
    }
    else {
      this.isCorrectExt = true
    }

  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'csv') {
      return true;
    }
    else {
      return false;
    }
  }

}
