import { Composer } from 'src/app/models/composer';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor() {}
  composer :Composer;

  ngOnInit(): void {
    let composerJson: Composer = JSON.parse(sessionStorage.getItem('composer'));
    this.composer = composerJson;
    console.log(this.composer);
  }

  active = 1;
 
}
