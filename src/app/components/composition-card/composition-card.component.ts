import { Composition } from 'src/app/models/composition';
import { Component, Input, OnInit } from '@angular/core';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-composition-card',
  templateUrl: './composition-card.component.html',
  styleUrls: ['./composition-card.component.sass']
})
export class CompositionCardComponent implements OnInit {

  @Input() composition: Composition;
  faHandshake = faHandshake;

  constructor() { }

  ngOnInit(): void {
  }

}
