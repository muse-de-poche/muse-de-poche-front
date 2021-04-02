import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faBackward, faCircle, faCog, faDotCircle, faForward, faPause, faPlay, faPlus, faStepBackward, faStop, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';

import { Composition } from 'src/app/models/composition';
import { Track } from 'src/app/models/track';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CompositionService } from 'src/app/services/composition.service';
import { SoundServiceService } from 'src/app/services/sound-service.service';
import { TrackService } from 'src/app/services/track.service';
import { SoundComponent } from './sound/sound.component';

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
  faDotCircle = faDotCircle;
  faStepBackward = faStepBackward;
  faBackward = faBackward;
  faForward = faForward;
  faCog = faCog;
  faUsers = faUsers;
  faPlus = faPlus;

  playButton: boolean = false;

  closeResult: String = '';

  @Input() compositionId: number
  composition: Composition;

  @ViewChild(SoundComponent) soundComp: SoundComponent[];

  context: AudioContext;
  isRecording: boolean = false;
  blob: Blob;

  curTrack: Track;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private compositionService: CompositionService,
    private soundService: SoundServiceService,
    private authService: AuthentificationService,
    private trackService: TrackService,
    private recorderService: NgAudioRecorderService
  ) {
    this.recorderService.recorderError.subscribe(recorderErrorCase => {
      console.log(recorderErrorCase);
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.compositionId = +params.get('id')
    })
    this.compositionService.getCompositionById(this.compositionId).subscribe((compo: Composition) => {
      this.composition = compo;
      this.curTrack = this.composition.tracks[this.composition.tracks.length - 1];
    });
    window.AudioContext = window.AudioContext;
    this.context = new AudioContext();
  }

  isCurOwner(): Boolean {
    return this.authService.getConnected().id == this.composition.owner.id;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openLg(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
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

  newTrack() {
    let track: Track = {
      id: null,
      duration: 0,
      instrument: 'Track',
      composition: this.composition,
      sounds: []
    };
    this.trackService.createTrack(track).subscribe(
      response => {
        this.curTrack = response;
        this.composition.tracks.push(this.curTrack);
        console.log(this.curTrack);
      },
      err => console.log(err)
    );
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

  setCurTrack(track: Track) {
    this.curTrack = track;
    console.log(this.curTrack);
  }

  recording() {
    this.isRecording = true;
    this.soundService.startPlay("play");
    this.recorderService.startRecording();
  }

  stopRecording() {
    this.stop();
    this.isRecording = false;
    this.recorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output: Blob) => {
      // do post output steps
      // console.log(output);
      this.blob = output;
      console.log(this.blob);
      this.soundService.createSound(this.curTrack.id, this.blob).subscribe(
        sound => {
          this.curTrack.sounds.push(sound);
        },
        err => console.log(err)
      )
    }).catch(errorCase => {
      console.log(errorCase);
    });
  }

}
