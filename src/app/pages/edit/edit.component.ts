import { Component, OnInit, DoCheck } from '@angular/core';
import { EditService } from './shared/edit.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import ld from 'lodash'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import dayjs from 'dayjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, DoCheck {

  @BlockUI() blockUI: NgBlockUI;
  informacionPersonal = {}
  keys = []
  values = []
  ultimoDia = dayjs().format('YYYY-MM-DD')

  formGroupEditarDatosUser: FormGroup
  formGroupEditarDatosMedico: FormGroup

  //banderas
  isCargando = true
  isEditarActive = false
  isEditarContactoActive = false
  isError = false
  isInfoActualizada = false
  isErrorContacto = false
  isEdadMal = false
  isContrasenaVisible = false

  constructor(private readonly editService: EditService, private readonly _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.crearFormularioEditarDatosUser()
    this.recuperarInformacionPersonal()
  }
  ngDoCheck(): void {
    var y: number = +this.f.fechaNacimiento.value;
    if (y < 1 || y > 100) {
      this.isEdadMal = true
    } else {
      this.isEdadMal = false
      
    }

  }

  cambiarEstadoBanderas(){
    this.isErrorContacto = false
    this.isError = false
  }

  crearFormularioEditarDatosUser() {
    this.formGroupEditarDatosUser = this._formBuilder.group({


      nombre: new FormControl('', [Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),

    })

  }

  get f() { return this.formGroupEditarDatosUser.controls }

  crearFormularioEditarDatosMedico() {
    this.formGroupEditarDatosMedico = this._formBuilder.group({


      nombre: new FormControl('', [Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),

    })

  }

  get ff() { return this.formGroupEditarDatosMedico.controls }

  limpiarFormulario() {
    this.formGroupEditarDatosUser.reset()
    this.formGroupEditarDatosMedico.reset()
  }

  recuperarInformacionPersonal() {
    this.isCargando = true
    this.editService.recuperarInformacionPersonal('oaaaa-eeee-uuu-uuuu').subscribe(res => {
      this.informacionPersonal = res.body
      console.log(this.informacionPersonal)
      this.isCargando = false
      this.formGroupEditarDatosUser.setValue({
        nombre: this.informacionPersonal['nombres'],
        apellidoPaterno: this.informacionPersonal['apellidoPaterno'],
        sexo: '',
        apellidoMaterno: this.informacionPersonal['apellidoMaterno'],
        fechaNacimiento: this.informacionPersonal['fechaNacimiento'],
        correoElectronico: this.informacionPersonal['correoElectronico'],
        contrasena: this.informacionPersonal['contrasena'],
      });
      if (this.informacionPersonal['sexo'] == 0) {
        this.formGroupEditarDatosUser.controls['sexo'].setValue('Masculino')
      }
      else {
        this.formGroupEditarDatosUser.controls['sexo'].setValue('Femenino')
      }
      console.log(this.f.nombre.value)
    })
  }
  guardarNuevaInfo() {
    //this.isCargando = true
    const parametros = []

    Object.keys(this.f).forEach(key => {
      if (key === 'nombre' || key === 'apellidoPaterno' || key === 'apellidoMaterno' || key === 'fechaNacimiento' || key === 'correoElectronico' || key === 'contrasena') {
        if (Boolean(this.f[key].value)) {
          parametros.push({ parametro: ld.snakeCase(key), valor: this.f[key].value })
        }
      }
      if(key === 'sexo'){
          if(this.f[key].value == 'Masculino'){
            parametros.push({ parametro: ld.snakeCase(key), valor: 0 })
          } else if (this.f[key].value == 'Femenino'){
            parametros.push({ parametro: ld.snakeCase(key), valor: 1 })
          }
      }
    })
    this.blockUI.start('Guardando informaci??n...');
    this.editService.guardarNuevosDatos(parametros).subscribe(res => {
      this.informacionPersonal = res.body
      this.isCargando = false
      this.isEditarActive = false
      this.isEditarContactoActive = false
      this.isInfoActualizada = true
      localStorage.removeItem('nombre')
      localStorage.setItem('nombre', this.informacionPersonal['nombres'])
      this.recuperarInformacionPersonal()
      this.blockUI.stop();
      
    }, err => {
      this.isCargando = false
      this.isEditarContactoActive = false
      this.isEditarActive = false
      this.isError = true
      this.recuperarInformacionPersonal()
      this.blockUI.stop();
    })
  }

}
