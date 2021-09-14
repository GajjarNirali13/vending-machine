import { Component, Input, ViewChild } from '@angular/core';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vending-machine';
  
  constructor(
    public appService: AppService
  ) {
  }

  resetMachine(){
    this.appService.setResetVendingData();
  }
}
