import { Component, OnInit } from '@angular/core';
import { PerfilSinteticoService } from './_shared/perfil-sintetico.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'

@Component({
  selector: 'app-perfil-sintetico',
  templateUrl: './perfil-sintetico.component.html',
  styleUrls: ['./perfil-sintetico.component.css']
})
export class PerfilSinteticoComponent implements OnInit {

  ritmoCardiacoSlider = 60

  constructor(private readonly _perfilSinteticoService: PerfilSinteticoService) { }

  ngOnInit(): void {
  }
  ingresarRitmoCardiaco(ritmoCardiaco: any){
    this.ritmoCardiacoSlider = ritmoCardiaco
  }


  probarPerfil(){
    this._perfilSinteticoService.probarPerfilSintetico('22-02-1999', true, 45).subscribe(res => console.log(res))
  }

  
}
