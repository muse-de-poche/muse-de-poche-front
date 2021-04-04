import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faBackward, faBlender, faCircle, faCog, faDotCircle, faForward, faPause, faPlay, faPlus, faStepBackward, faStop, faTools, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import Crunker from 'crunker';

import * as RecordRTC from 'recordrtc';

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
  faTools = faTools;
  faBlender = faBlender;

  playButton: boolean = false;

  closeResult: String = '';

  @Input() compositionId: number
  composition: Composition;

  @ViewChild(SoundComponent) soundComp: SoundComponent[];

  context: AudioContext;
  isRecording: boolean = false;

  curTrack: Track;

  // recorder RTC members
  //Lets declare Record OBJ
  record;
  //Will use this flag for toggeling recording
  recording = false;
  //URL of Blob
  url;
  error;
  //
  sampleRate: number = 44100;
  bufferSize: number = 16384;

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

  deleteSound(track: Track) {
    this.soundService.deleteSound(track.sounds[0].id).subscribe();
    track.sounds.pop();
  }

  /**
   * recording with RTC recorder
   */
  /**
   * Start recording.
   */
  initiateRecording() {
    this.isRecording = true;
    this.recording = true;
    this.soundService.startPlay("play");
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    var options = {
      mimeType: "audio/webm",
      numberOfAudioChannels: 1,
      sampleRate: 48000,
      // desiredSampRate: 44100,
      bufferSize: 16384
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
    this.stop();
    this.isRecording = false;
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.soundService.createSound(this.curTrack.id, blob).subscribe(
      sound => {
        this.curTrack.sounds.push(sound);
      },
      err => console.log(err)
    )
    console.log("blob", blob);
    console.log("url", this.url);
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

  /**
   * set echantillonnage and buffer size values
   */
  setReglages() {
    console.log(this.sampleRate);
    console.log(this.bufferSize);
    this.modalService.dismissAll();
  }

  /**
   *  create an array from composition's sounds
   * @returns array of URL's
   */
  getSoundsArray() {
    let soundsArray = [];
    for (let track of this.composition.tracks) {
      soundsArray.push("http://localhost:8080/sound/file/" + track.sounds[0].id);
    }
    return soundsArray;
  }

  /**
   * create a merge mix of the composition
   */
  mergeMix() {
    let soundArray = this.getSoundsArray();
    let crunker = new Crunker({ sampleRate: this.sampleRate });
    crunker
      .fetchAudio(...soundArray)
      .then((buffer) => crunker.mergeAudio(buffer))
      .then(merged => crunker.export(merged, "audio/ogg"))
      .then(output => {
        // crunker.download(output.blob);
        console.log(output);
        this.soundService.createMix(output.blob).subscribe(
          sound => {
            this.composition.blobPath = "http://localhost:8080/sound/file/" + sound.id;
            this.compositionService.update(this.composition).subscribe(
              compo => this.composition = compo.body,
              err => console.log(err))
          },
          err => console.log(err)
        )
      })
      .catch(error => {
        throw new Error(error);
      });
  }
}
