import { Component, OnInit, DoCheck } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import dayjs from 'dayjs';
import ld from 'lodash'
import { NuevoEcgService } from './shared/nuevo-ecg.service';
import { Router } from '@angular/router';
import { Options } from "@angular-slider/ngx-slider";
import { DashboardService } from '../dashboard/shared/dashboard.service';

@Component({
  selector: 'app-nuevo-ecg',
  templateUrl: './nuevo-ecg.component.html',
  styleUrls: ['./nuevo-ecg.component.css']
})
export class NuevoEcgComponent implements OnInit, DoCheck {

  value: number = 0;
  highValue: number = 30;
  options: Options = {
    floor: 0,
    ceil: 30
  };

  ultimoDia = dayjs().format('YYYY-MM-DD')
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

  isMinutosIntervalo = true
  isMinutosInicioFin = true
  isArchivoCargado = false;

  isIntervaloMayorQueRangoAnalisis = false
  isEdadMal: boolean;

  constructor(private readonly _nuevoEcgService: NuevoEcgService,
              private readonly _formBuilder: FormBuilder, 
              private _router: Router,
              private readonly _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.crearFormularioNuevoEcg()
    this.crearFormularioNuevoEcgPorLotes()
    console.log(this.ultimoDia)
  }
  ngDoCheck(): void {
    
    var y: number = +this.ff.edad.value;
    if (y < 1 || y > 100) {
      this.isEdadMal = true
    } else {
      this.isEdadMal = false
      
    }

    if(this.isMinutosInicioFin){
      if(this.isMinutosIntervalo){
        if(this.f.intervaloAnalisis.value > this.highValue || this.f.intervaloAnalisis.value < this.value || this.ff.intervaloAnalisis.value > this.highValue || this.ff.intervaloAnalisis.value < this.value){
          this.isIntervaloMayorQueRangoAnalisis = true
        } else {
          this.isIntervaloMayorQueRangoAnalisis = false 
        }
      }
      if(!this.isMinutosIntervalo){
        if(this.f.intervaloAnalisis.value > this.highValue*60 || this.f.intervaloAnalisis.value < this.value*60 || this.ff.intervaloAnalisis.value > this.highValue*60 || this.ff.intervaloAnalisis.value < this.value*60){
          this.isIntervaloMayorQueRangoAnalisis = true
        } else {
          this.isIntervaloMayorQueRangoAnalisis = false 
        }
      }
    }


    if(!this.isMinutosInicioFin){
      if(this.isMinutosIntervalo){
        if(this.f.intervaloAnalisis.value*60 > this.highValue || this.f.intervaloAnalisis.value*60 < this.value || this.ff.intervaloAnalisis.value*60 > this.highValue || this.ff.intervaloAnalisis.value*60 < this.value){
          this.isIntervaloMayorQueRangoAnalisis = true
        } else {
          this.isIntervaloMayorQueRangoAnalisis = false 
        }
      }
      if(!this.isMinutosIntervalo){
        if(this.f.intervaloAnalisis.value > this.highValue || this.f.intervaloAnalisis.value < this.value || this.ff.intervaloAnalisis.value > this.highValue || this.ff.intervaloAnalisis.value < this.value){
          this.isIntervaloMayorQueRangoAnalisis = true
        } else {
          this.isIntervaloMayorQueRangoAnalisis = false 
        }
      }
    }
  }

  recuperarDatosUsuario(){
    this.isCargandoIngformacionUsuarioSuccess = false
    this._nuevoEcgService.recuperarDatosUsuario().subscribe(res => {
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


  cambiarMedidaIntervaloMinutos(estado: boolean) {
    if (estado) {
      this.isMinutosIntervalo = true
      return
    }
    this.isMinutosIntervalo = false
  }


  cambiarMedidaInicioFinMinutos(estado: boolean) {
    console.log('entro a cambiar medida')
    if (estado) {
      this.isMinutosInicioFin = true
      if(Boolean(this.f.electrocardiograma.value)){
        console.log(this.f.electrocardiograma.value.length)
        this.contarMuestras(this.f.electrocardiograma.value.length)
        return
      }
      this.contarMuestras(this.ff.electrocardiograma.value.length)
      return
    }
    this.isMinutosInicioFin = false
    if(Boolean(this.f.electrocardiograma.value)){
      console.log(this.f.electrocardiograma.value.length)
      this.contarMuestras(this.f.electrocardiograma.value.length)
      return
    }
    this.contarMuestras(this.ff.electrocardiograma.value.length)

  }

  crearFormularioNuevoEcg() {
    this.formGroupNuevoEcg = this._formBuilder.group({
      edad: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      inicioAnalisis: new FormControl('', []),
      finAnalisis: new FormControl('', []),
      intervaloAnalisis: new FormControl('', [Validators.required]),
      electrocardiograma: new FormControl('', []),

    })
    this.formGroupNuevoEcg.controls['intervaloAnalisis'].setValue(1)

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
      intervaloAnalisis: new FormControl('', [Validators.required]),
      electrocardiograma: new FormControl('', []),

    })
    this.formGroupNuevoEcgPorLotes.controls['intervaloAnalisis'].setValue(1)
    this.formGroupNuevoEcgPorLotes.controls['edad'].setValue(18)

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



  onFileSelect(event) {
    this.archivoTxt = event.target.files[0];
    const fileReader = new FileReader();
    const parametros = []
    
    if (this.validateFile(this.archivoTxt.name)) {
      this.isCorrectExt = false
      this.isArchivoCargado = true
      let i = 0
      console.log(this.archivoTxt)
      fileReader.onload = async (e) => {
        const ArrregloMuestrasSenial = (e.target.result as string).split('\r\n');
  
        ArrregloMuestrasSenial.forEach(element => {
          parametros.push(element)
        });
         
        await this.contarMuestras(parametros.length)

      
      }
      fileReader.readAsText(this.archivoTxt)

      console.log(parametros)
      
      if(this.isEcgPropio){
        this.formGroupNuevoEcg.controls['electrocardiograma'].setValue(parametros);
        this.contarMuestras(this.formGroupNuevoEcg.controls['electrocardiograma'].value.length)
      }
      else if(this.isNotEcgPropio){
        this.formGroupNuevoEcgPorLotes.controls['electrocardiograma'].setValue(parametros);
        this.contarMuestras(this.formGroupNuevoEcgPorLotes.controls['electrocardiograma'].value.length)
      }
    }
    else {
      this.isCorrectExt = true
    }

  }



  contarMuestras(array){
    console.log('ecgpropio'+this.isEcgPropio)
    console.log('noecgpropio'+this.isNotEcgPropio)
    console.log('entro al contar muestras')
    let tiempoActualizado = 0
    if(this.isMinutosInicioFin){
      tiempoActualizado = Math.floor(array/360/60)
    }
    if(!this.isMinutosInicioFin){
      tiempoActualizado = Math.floor(array/360)
    }
    this.highValue = tiempoActualizado
      this.options = {
        floor: 0,
        ceil: tiempoActualizado
      };
    console.log('tiempo actualizado: '+tiempoActualizado)
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


 
  cargarNuevoEcg() {
    this.isClasificacionLista = false
    this.isCargando = true
    const parametros = []

    if (this.isEcgPropio) { }
    Object.keys(this.f).forEach(key => {
      if (key === 'edad' || key === 'electrocardiograma' || key === 'intervaloAnalisis') {
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
        if (key === 'nombre' || key === 'apellidoPaterno' || key === 'apellidoMaterno' || key === 'edad' || key === 'electrocardiograma' || key === 'intervaloAnalisis') {
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

    if(this.isMinutosInicioFin){
      parametros.push({parametro: 'is_minutos_inicio_fin', valor: this.isMinutosInicioFin})
    }
    if(!this.isMinutosInicioFin){
      parametros.push({parametro: 'is_minutos_inicio_fin', valor: this.isMinutosInicioFin})
    }
    if(this.isMinutosIntervalo){
      parametros.push({parametro: 'is_minutos_intervalo', valor: this.isMinutosIntervalo})
    }
    if(!this.isMinutosIntervalo){
      parametros.push({parametro: 'is_minutos_intervalo', valor: this.isMinutosIntervalo})
    }
    
    parametros.push({parametro: 'id_usuario', valor: localStorage.getItem('idUsuario')})
    
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


}
