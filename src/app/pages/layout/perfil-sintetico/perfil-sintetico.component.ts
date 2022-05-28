import { Component, OnInit, DoCheck } from '@angular/core';
import { PerfilSinteticoService } from './_shared/perfil-sintetico.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'
import ld from 'lodash'

@Component({
  selector: 'app-perfil-sintetico',
  templateUrl: './perfil-sintetico.component.html',
  styleUrls: ['./perfil-sintetico.component.css']
})
export class PerfilSinteticoComponent implements OnInit, DoCheck {

  ultimoDia = dayjs().format('YYYY-MM-DD')
  ritmoCardiacoSlider = 60
  formGroupPerfilSintetico: FormGroup
  resultado = ''


  //banderas
  isClasificacionLista = false
  isClasificacionFailed = false
  isCargando = false
  isEdadMal: boolean;

  constructor(private readonly _perfilSinteticoService: PerfilSinteticoService,
    private readonly _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.crearFormularioPerfilSintetico()
    console.log(this.ultimoDia)
  }

  ngDoCheck(): void {
    var y: number = +this.f.edad.value;
    if (y < 1 || y > 100) {
      this.isEdadMal = true
    } else {
      this.isEdadMal = false
      
    }

  }

  crearFormularioPerfilSintetico() {
    this.formGroupPerfilSintetico = this._formBuilder.group({
      
      
      edad: new FormControl('', [Validators.required]),
      ritmoCardiaco: new FormControl('', [Validators.required]),
      inputs: new FormControl('', [Validators.required]),
      
    })
    this.formGroupPerfilSintetico.controls['ritmoCardiaco'].setValue(60);
    this.formGroupPerfilSintetico.controls['edad'].setValue(18)

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
    this._perfilSinteticoService.probarPerfilSintetico(parametros).subscribe(res => {
      //this.limpiarFormulario()
      this.isCargando = false
      this.isClasificacionLista = true
      console.log(res.body.clasificacion)
      this.resultado = res.body.clasificacion == 1 ? 'Ritmo cardiaco normal' :
      res.body.clasificacion == 2 ? 'Taquicardia' :
      res.body.clasificacion == 3 ? 'Bradicardia' : ''
      
      
    }, err => {
      //this.error = err.error.details
      this.isClasificacionFailed = true
      this.isCargando = false
      
    })
  }

  
}
