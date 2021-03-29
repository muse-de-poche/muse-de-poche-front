import { CompositionService } from 'src/app/services/composition.service';
import { Composition } from 'src/app/models/composition';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {

  constructor(private api: CompositionService) { }
  @Input() id: number;

  recentlyAdded!: Composition[];

  ngOnInit(): void {
    console.log(this.id);
    this.api.getCompositionByComposer(this.id).subscribe((composition:Composition[]) => this.recentlyAdded = composition);
  }

}
