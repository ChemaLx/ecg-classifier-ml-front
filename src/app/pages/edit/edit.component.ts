import { Component, OnInit } from '@angular/core';
import { EditService } from './shared/edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  informacionPersonal = {}
  keys = []
  values = []
  informacionPersonalArray = []
  

  //banderas
  isCargando = true
  isEditarActive = false
  isEditarContactoActive = false

  constructor(private readonly editService: EditService) { }

  ngOnInit(): void {
    this.recuperarInformacionPersonal()
  }

  recuperarInformacionPersonal() {
    this.editService.recuperarInformacionPersonal('oaaaa-eeee-uuu-uuuu').subscribe(res => {
      this.informacionPersonal = res.body
      this.isCargando = false
      /* this.keys = Object.keys(res.body)
      this.values = Object.values(res.body)
      let i = 0
      console.log(this.keys)
      this.keys.map(key => {
        this.informacionPersonal.push({key: this.keys[i], value: this.values[i]})
        i++
      })
      console.log(this.informacionPersonal) */
    })
  }
  guardarNuevaInfo() {
    this.isCargando = true
    this.editService.recuperarInformacionPersonal('oaaaa-eeee-uuu-uuuu').subscribe(res => {
      this.informacionPersonal = res.body
      this.isCargando = false
      this.isEditarActive = false
      
    })
  }
  guardarNuevaInfoContacto() {
    this.isCargando = true
    this.editService.recuperarInformacionPersonal('oaaaa-eeee-uuu-uuuu').subscribe(res => {
      this.informacionPersonal = res.body
      this.isCargando = false
      this.isEditarContactoActive = false
      
    })
  }

}
