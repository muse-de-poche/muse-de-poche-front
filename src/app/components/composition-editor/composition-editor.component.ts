import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faBackward, faCircle, faForward, faPause, faPlay, faPlus, faStepBackward, faStop } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Composition } from 'src/app/models/composition';
import { CompositionService } from 'src/app/services/composition.service';
import { SoundServiceService } from 'src/app/services/sound-service.service';
import { SoundComponent } from '../sound/sound.component';

@Component({
  selector: 'app-composition-editor',
  templateUrl: './composition-editor.component.html',
  styleUrls: ['./composition-editor.component.sass']
})
export class CompositionEditorComponent implements OnInit {

  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  faCircle = faCircle;
  faStepBackward = faStepBackward;
  faBackward = faBackward;
  faForward = faForward;
  faPlus = faPlus;

  playButton: boolean = false;

  closeResult: String = '';

  @Input() compositionId: number
  composition:Composition;
  context: AudioContext;

  @ViewChild(SoundComponent) soundComp: SoundComponent[];

  constructor(private modalService: NgbModal,
     private router: Router,
      private api: CompositionService,
      private soundService: SoundServiceService
      ) { }

  ngOnInit(): void {
    this.api.getCompositionById(3).subscribe((compo:Composition) => {
      this.composition = compo;
      // console.log(this.composition)
    });
    window.AudioContext = window.AudioContext;
    this.context = new AudioContext();
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

  play() {
    this.soundService.startPlay("play");
    this.playButton = !this.playButton;
  }
  stop() {
    this.soundService.stopPlay("stop");
    this.playButton = false;
  }
  skipBackward() {
    this.soundService.skipBackward("backward");
  }
  skipForward() {
    this.soundService.skipForward("forward");
  }

}
