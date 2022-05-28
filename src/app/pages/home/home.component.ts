import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  ingresar(){
    if(Boolean(localStorage.getItem('idUsuario'))){
      this._router.navigate(['/panel'])
    } else {
      this._router.navigate(['/login'])
    }

  }
}
