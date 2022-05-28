import { Component, OnInit } from '@angular/core';
import { HistorialService } from './shared/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  datosHistorial = []
  isCargando = false
  isError = false
  constructor(private readonly historialService: HistorialService) { }

  ngOnInit(): void {
    this.recuperarHistorial()
  }
  recuperarHistorial(){
    this.isCargando = true
    this.historialService.recuperarHistorial('ueoaueao').subscribe(res => {
      this.datosHistorial = res.body.historial
      console.log(this.datosHistorial)
      this.isCargando = false
    }, err => {
      this.isCargando = false
      this.isError = true

    })
  }

}
