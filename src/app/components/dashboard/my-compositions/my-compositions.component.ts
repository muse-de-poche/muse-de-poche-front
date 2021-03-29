import { Composition } from 'src/app/models/composition';
import { CompositionService } from 'src/app/services/composition.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-compositions',
  templateUrl: './my-compositions.component.html',
  styleUrls: ['./my-compositions.component.sass']
})
export class MyCompositionsComponent implements OnInit {

  constructor(private api: CompositionService) { }
  @Input() id: number;

  recentlyAdded!: Composition[];

  ngOnInit(): void {
    this.api.getCompositionByComposer(this.id).subscribe((composition:Composition[]) => this.recentlyAdded = composition);
  }

}
