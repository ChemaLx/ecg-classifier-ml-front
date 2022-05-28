import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-comercial',
  templateUrl: './navbar-comercial.component.html',
  styleUrls: ['./navbar-comercial.component.css']
})
export class NavbarComercialComponent implements OnInit {
  isUsuarioIniciado: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(Boolean(localStorage.getItem('idUsuario'))){
      this.isUsuarioIniciado = true
    } else {
      this.isUsuarioIniciado = false
    }
  }


}
