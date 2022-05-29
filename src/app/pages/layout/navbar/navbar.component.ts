import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombre = ''
  constructor() {
    this.nombre = localStorage.getItem('nombre')
   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.removeItem('idUsuario')
    localStorage.removeItem('nombre')
  }

}
