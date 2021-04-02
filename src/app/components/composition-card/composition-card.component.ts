import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: String = '';

  constructor(
    public authService: AuthentificationService,
    private collaborationService: CollaborationService,
    private compositionService: CompositionService,
    private modalService: NgbModal
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
