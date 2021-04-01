import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Sound } from 'src/app/models/sound';
import { SoundServiceService } from 'src/app/services/sound-service.service';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import { Subscription } from 'rxjs';
import { faVolumeDown, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.sass']
})
export class SoundComponent implements OnInit, OnDestroy {

  @Input() context: AudioContext;
  @Input() sound: Sound;
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  buffer: any[];
  subscription: Subscription;

  faVolumeMute = faVolumeMute;
  faVolumeDow = faVolumeDown;
  isMute: boolean = false;

  //waveSurfer
  wave: WaveSurfer = null;
  id: number;
  constructor(private soundService: SoundServiceService) {
    this.subscription = this.soundService.soundObservable$.subscribe(
      (event) => {
        console.log(event);
        switch(event) {
          case "play":
            this.play();
            break;
          case "stop":
            this.stop();
            break;
          case "backward":
            this.skipBackward();
            break;
          case "forward":
            this.skipForward();
            break;
        }
      }
    );
  }

  ngOnInit(): void {
    this.id = this.sound.id;
    this.generateWaveform();
    Promise.resolve().then(() => this.wave.load('http://localhost:8080/sound/file/' + this.sound.id));
  }

  generateWaveform(): void {
    Promise.resolve(null).then(() => {
      this.wave = WaveSurfer.create({
        container: '#waveform-' + this.id,
        waveColor: '#4196B5',
        progressColor: '#2E505C',
        skipSeconds: 10,
        barWidth: 2,
        barRadius: 4,
        height: 96,
        scrollParent: true,
        partialRender: true,
        plugins: [
          TimelinePlugin.create({
            container: '#wave-timeline'
          })
        ]
      });
    });
  }

  play() {
    this.wave.playPause();
  }

  stop() {
    this.wave.stop();
  }

  skipBackward() {
    this.wave.skipBackward();
  }

  skipForward() {
    this.wave.skipForward();
  }

  mute() {
    this.wave.toggleMute();
    this.isMute = !this.isMute;
  }

  setVolume(volume) {
    this.wave.setVolume(parseInt(volume, 10) / 100);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
