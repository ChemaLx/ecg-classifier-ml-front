import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'
import ld from 'lodash'
import { NuevoEcgService } from './shared/nuevo-ecg.service';

@Component({
  selector: 'app-nuevo-ecg',
  templateUrl: './nuevo-ecg.component.html',
  styleUrls: ['./nuevo-ecg.component.css']
})
export class NuevoEcgComponent implements OnInit {

  ultimoDia = dayjs().format('YYYY-MM-DD')
  ritmoCardiacoSlider = 60
  formGroupPerfilSintetico: FormGroup
  resultado = ''


  //banderas
  isClasificacionLista = false
  isClasificacionFailed = false
  isCargando = false

  constructor(private readonly _nuevoEcgService: NuevoEcgService,
    private readonly _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.crearFormularioPerfilSintetico()
    console.log(this.ultimoDia)
  }

  crearFormularioPerfilSintetico() {
    this.formGroupPerfilSintetico = this._formBuilder.group({
      
      
      edad: new FormControl('', [Validators.required]),
      ritmoCardiaco: new FormControl('', [Validators.required]),
      inputs: new FormControl('', [Validators.required]),
      
    })
    this.formGroupPerfilSintetico.controls['ritmoCardiaco'].setValue(60);

  }

  get f() { return this.formGroupPerfilSintetico.controls }

  limpiarFormulario() {
    this.formGroupPerfilSintetico.reset()
  }

  probarPerfil(){
    this.isClasificacionLista = false
    this.isCargando = true
    const parametros = []

    Object.keys(this.f).forEach(key => {
      if (key === 'edad' || key === 'ritmoCardiaco') {
        if (Boolean(this.f[key].value)) {
          parametros.push({ parametro: ld.snakeCase(key), valor: this.f[key].value })
        }
      }
      if (key === 'inputs') {
        if (Boolean(this.f[key].value)) {
          parametros.push({ parametro: 'sexo', valor: this.f[key].value })
        }
      }
    })

    console.log(parametros)
    this._nuevoEcgService.nuevoRegistroEcg(parametros).subscribe(res => {
      //this.limpiarFormulario()
      this.isCargando = false
      this.isClasificacionLista = true
      this.resultado = res.body.clasificacionArritmia == 0 ? 'Ritmo cardiaco normal' :
      res.body.clasificacionArritmia == 1 ? 'Taquicardia' :
      res.body.clasificacionArritmia == 2 ? 'Bradicardia' : ''
      
      
    }, err => {
      //this.error = err.error.details
      this.isClasificacionFailed = true
      this.isCargando = false
      
    })
  }

  
}
