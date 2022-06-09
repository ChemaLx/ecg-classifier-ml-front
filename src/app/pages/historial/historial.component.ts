import { Component, OnInit } from '@angular/core';
import { HistorialService } from './shared/historial.service';
import { DashboardService } from '../dashboard/shared/dashboard.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  datosHistorial = []
  isCargando = false
  isError = false
  isCargandoClasificacion = false
  constructor(private readonly historialService: HistorialService, private _router: Router,
    private readonly _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.recuperarHistorial()
  }
  recuperarHistorial() {
    this.isCargando = true
    this.historialService.recuperarHistorial().subscribe(res => {
      this.datosHistorial = res.body.historial
      console.log(this.datosHistorial)
      this.isCargando = false
    }, err => {
      this.isCargando = false
      this.isError = true

    })
  }
  recuperarClasificacion(idClasificacion) {
    this.isCargandoClasificacion = true
    this.blockUI.start('Recuperando información...');
    this.historialService.recuperarClasificacion(idClasificacion).subscribe(res => {
    
      this._dashboardService.ecg = res.body
      console.log(this._dashboardService.ecg)
      this.blockUI.stop();
      this._router.navigate(['/dashboard'])
      this.isCargandoClasificacion = false
    }, err => {
      this.blockUI.stop();
      this.isCargandoClasificacion = false
      this.isError = true

    })
  }

}
