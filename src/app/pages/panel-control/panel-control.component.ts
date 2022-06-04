import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit {

  horaActual = dayjs()
  mensaje = ''
  nombre = ''
  constructor() {
    this.nombre = localStorage.getItem('nombre');
  }
  ngOnInit(): void {
    if (dayjs().hour(0).minute(0).second(0)['$d'] <= this.horaActual['$d'] && this.horaActual['$d'] < dayjs().hour(12).minute(0).second(0)['$d']) {
      this.mensaje = 'Buenos días'
    }
    if (dayjs().hour(12).minute(0).second(0)['$d'] <= this.horaActual['$d'] && this.horaActual['$d'] < dayjs().hour(20).minute(0).second(0)['$d']) {
      this.mensaje = 'Buenas tardes'
    }
    if (dayjs().hour(20).minute(0).second(0)['$d'] <= this.horaActual['$d'] && this.horaActual['$d'] < dayjs().hour(23).minute(59).second(59)['$d']) {
      this.mensaje = 'Buenas noches'
    }
  }

}
