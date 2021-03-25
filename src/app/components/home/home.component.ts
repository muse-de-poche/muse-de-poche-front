import { Component, OnInit } from '@angular/core';
import { Composition } from 'src/app/models/composition';
import { ActivatedRoute } from '@angular/router';
import { CompositionService } from 'src/app/services/composition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  mostViewed!: Composition[];
  recentlyAdded!: Composition[];
  lastUpdated!: Composition[];
  
  constructor(private activatedRoute: ActivatedRoute, private api: CompositionService) { }

  ngOnInit(): void {
    this.api.getMostViewedCompositions().subscribe((composition:Composition[]) => this.mostViewed = composition);
    this.api.getRecentlyAddedCompositions().subscribe((composition:Composition[]) => this.recentlyAdded = composition);
    this.api.getLastUpdatedCompositions().subscribe((composition:Composition[]) => this.lastUpdated = composition);
  }

}
