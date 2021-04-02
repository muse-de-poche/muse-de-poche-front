import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { faBan, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Collaboration } from 'src/app/models/collaboration';
import { Composer } from 'src/app/models/composer';
import { Composition } from 'src/app/models/composition';
import { CollaborationService } from 'src/app/services/collaboration.service';
import { ComposerService } from 'src/app/services/composer.service';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.sass']
})
export class WorkgroupComponent implements OnInit {

  faBan = faBan;
  faPlus = faPlus;
  faCheck = faCheck;

  @Input() composition: Composition;
  collaborations: Collaboration[];
  private composers: Composer[];

  composer: Composer;
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private collaborationService: CollaborationService,
    private composerService: ComposerService
  ) { }

  ngOnInit(): void {
    this.collaborationService.getCollaborationsByComposition(this.composition.id).subscribe(result => {
      this.collaborations = result;
    });
    this.composerService.all().subscribe(result => {
      this.composers = result;
    });
  }

  newCollaboration() {
    let newCollab: Collaboration = {
      validatedDate: new Date(),
      composer: this.composer,
      composition: this.composition,
      status: "ACCEPTED",
      text: this.composer.pseudo + " à le plaisir de t\'invité à composer le morceau " + this.composition.title
    }
    this.collaborationService.create(newCollab).subscribe(c => {
      this.collaborations.push(c);
    });
  }

  ban(i: number) {
    this.collaborationService.ban(this.collaborations[i]).subscribe(c => {
      this.collaborations.splice(i, 1);
    });
  }

  search: OperatorFunction<string, readonly Composer[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.composers.filter(c => c.pseudo.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: { pseudo: string }) => x.pseudo;

}
