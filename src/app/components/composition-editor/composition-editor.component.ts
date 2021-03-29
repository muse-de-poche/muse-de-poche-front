import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBackward, faCircle, faForward, faPlay, faPlus, faStepBackward, faStop } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Composition } from 'src/app/models/composition';
import { Track } from 'src/app/models/track';
import { CompositionService } from 'src/app/services/composition.service';

@Component({
  selector: 'app-composition-editor',
  templateUrl: './composition-editor.component.html',
  styleUrls: ['./composition-editor.component.sass']
})
export class CompositionEditorComponent implements OnInit {

  faPlay = faPlay;
  faStop = faStop;
  faCircle = faCircle;
  faStepBackward = faStepBackward;
  faBackward = faBackward;
  faForward = faForward;
  faPlus = faPlus;

  closeResult: String = '';

  @Input() compositionId: number
  composition:Composition;

  tracks: Track[] = [
    {
      id: 1,
      duration: 10,
      instrument: "String",
      composition: null,
      sounds: []
    }
  ];

  constructor(private modalService: NgbModal, private router: Router, private api: CompositionService) { }

  ngOnInit(): void {
    this.api.getCompositionById(7).subscribe((compo:Composition) => {
      this.composition = compo;
      console.log(this.composition)
    });
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
