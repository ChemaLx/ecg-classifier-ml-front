import { Component, ElementRef, OnInit } from '@angular/core';
//import { multi } from 'src/app/shared/data';
import { DashboardService } from './shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  multi: any[];
  datos = {}
  view: [number, number] = [700, 350];
  isDatosVacios = false

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mili segundos (ms)';
  yAxisLabel: string = 'Amplitud (volts)';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private readonly _dashboardService: DashboardService) {
    this.datos = this._dashboardService.ecg
    if(!Boolean(this.datos['ecg'])){
      this.isDatosVacios = true
    }
    Object.assign(this, { multi: this.datos['ecg'] });
    this.view = [innerWidth / 1.4, 350];
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.35, 350];
  }

  public ngOnInit(): void {
      
  }
    
}