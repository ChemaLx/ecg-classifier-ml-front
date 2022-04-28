import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  isCargando = false
  constructor() { }

  ngOnInit(): void {
  }
  recuperarHistorial(){
    this.isCargando = true
    setTimeout(() => {
      this.isCargando = false
    }, 3000);
  }

}
