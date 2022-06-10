import { Component, OnInit } from '@angular/core';
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
  sexo = ''
  edad = ''
  yScaleMin = 800
  yScaleMax = 1300

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Muestras (1/360 s)';
  yAxisLabel: string = 'Amplitud (milivolts)';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private readonly _dashboardService: DashboardService) {
    this.datos = this._dashboardService.ecg
    if(typeof this.datos['resultado'] == 'string'){
        console.log(JSON.parse(this.datos['resultado']))
        Object.assign(this, { multi: JSON.parse(this.datos['resultado']) });
        this.view = [innerWidth / 1.4, 350];
        this.edad = this.datos['edad']
        this.sexo = this.datos['sexo']
    }
    else {
      if(!Boolean(this.datos['ecg'])){
        this.isDatosVacios = true
      }
      Object.assign(this, { multi: this.datos['ecg'] });
      this.view = [innerWidth / 1.4, 350];
      this.edad = this.datos['edad']
      this.sexo = this.datos['sexo']

    }
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