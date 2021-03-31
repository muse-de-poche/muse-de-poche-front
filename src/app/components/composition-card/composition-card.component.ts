import { Composition } from 'src/app/models/composition';
import { Component, Input, OnInit } from '@angular/core';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CollaborationService } from 'src/app/services/collaboration.service';
import { CompositionService } from 'src/app/services/composition.service';

@Component({
  selector: 'app-composition-card',
  templateUrl: './composition-card.component.html',
  styleUrls: ['./composition-card.component.sass']
})
export class CompositionCardComponent implements OnInit {

  @Input() composition: Composition;
  faHandshake = faHandshake;
  faEdit = faEdit;

  private editable:Boolean;

  constructor(
    public authService: AuthentificationService,
    private collaborationService: CollaborationService,
    private compositionService: CompositionService
  ) { }

  ngOnInit(): void {
    if (this.authService.isSignin()) {
      this.collaborationService.hasTheEditingRightsOn(
        this.authService.getConnected().id, 
        this.composition.id
      ).subscribe(result => {this.editable = result});
    } else {
      this.editable = false;
    }      
  }

  isEditable():Boolean {
    return this.editable || this.isOwner();
  }

  isOwner() {
    return this.composition.owner.id == this.authService.getConnected().id;
  }

}
