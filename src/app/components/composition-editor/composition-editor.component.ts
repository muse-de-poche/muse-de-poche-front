import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faBackward, faCircle, faForward, faPause, faPlay, faPlus, faStepBackward, faStop } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';

import { Composition } from 'src/app/models/composition';
import { Track } from 'src/app/models/track';
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
  faStepBackward = faStepBackward;
  faBackward = faBackward;
  faForward = faForward;
  faPlus = faPlus;

  playButton: boolean = false;

  closeResult: String = '';

  @Input() compositionId: number
  composition: Composition;

  @ViewChild(SoundComponent) soundComp: SoundComponent[];


  context: AudioContext;
  mediaStream = null;
  recorder = null;
  leftChannel: any[] = [];
  rightChannel: any[] = [];
  recordingLength: number;
  sampleRate: number = 44100;
  isRecording: boolean = false;
  blob: Blob;

  curTrack: Track;

  constructor(private modalService: NgbModal,
    private router: Router,
    private api: CompositionService,
    private soundService: SoundServiceService,
    private trackService: TrackService,
    private recorderService: NgAudioRecorderService
  ) {
    this.recorderService.recorderError.subscribe(recorderErrorCase => {
      console.log(recorderErrorCase);
    })
  }

  ngOnInit(): void {
    this.api.getCompositionById(3).subscribe((compo: Composition) => {
      this.composition = compo;
      this.curTrack = this.composition.tracks[this.composition.tracks.length - 1];
      console.log(this.composition)
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

  newTrack() {
    let track: Track = {
      id: null,
      duration: 0,
      instrument: 'triangle',
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
