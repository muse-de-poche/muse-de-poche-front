import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Metronome } from 'src/app/models/metronome';
import { VisSettings } from 'src/app/models/vis-settings';
import { MetronomeService } from 'src/app/services/metronome.service';
import { SoundServiceService } from 'src/app/services/sound-service.service';
import { MetronomeSound } from './engine/metronome-sound';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.sass']
})
export class MetronomeComponent implements OnInit, OnDestroy {

  soundsPath: String = "assets/audio/";
  sounds: string[] = ['High_Woodblock.wav', 'Low_Woodblock.wav', 'High_Bongo.wav',
    'Low_Bongo.wav', 'Drumsticks.wav', 'Claves.wav'];
  visSettings: VisSettings = {
    tempoBpm: 0,
    startTime: 0,
    getTime: undefined,
    metric: 0
  };

  faCog = faCog;
  closeResult: String = '';
  subscription: Subscription;
  
  @Input() metronome: Metronome;
  metroSound: MetronomeSound;
  soundsList: any[] = [];
  typeSelectList: any[] = [];
  startStopValue: String = 'Test';
  bpm: number;
  metric: number;
  clickType: number;
  muted: boolean = true;

  constructor(private metronomeService: MetronomeService, private modalService: NgbModal, private soundService: SoundServiceService) {
    this.subscription = this.soundService.soundObservable$.subscribe(
      (event) => {
        console.log(event);
        switch(event) {
          case "play":
            this.toggle();
            break;
          case "stop":
            this.toggle();
            break;          
        }
      }
    );
  }

  ngOnInit(): void {
    this.bpm = this.metronome.bpm;
    this.metric = +this.metronome.metric;
    this.clickType = +this.metronome.clickType;
    const metroSoundListener = {
      setTempo: (t) => this.visSettings.tempoBpm = t,
      setStartTime: (t) => this.visSettings.startTime = t,
      setMetric: (t) => this.visSettings.metric = t
    };
    this.metroSound = new MetronomeSound(this.soundsPath, this.sounds, metroSoundListener, this.bpm, this.metric, +this.metronome.clickType);

    this.visSettings.getTime = () => this.metroSound.audioContext.currentTime;


    for (const [index, name] of this.sounds.entries()) {
      const fileExtension = /\..*/;
      const optionText = name.replace('_', ' ').replace(fileExtension, '');
      if (index % 2 === 0)
        this.soundsList.push({ option: optionText, index: index });
    }
  }

  ngOnDestroy() {
    this.metroSound.running = false;
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

  /**
     * Sets the tempo.
     * @param bpm tempo in beats per minute
     */
  setTempo(bpm: number) {
    this.bpm = bpm;
    this.metroSound.setTempo(bpm);
  }

  /**
   * Sets the metronome sound.
   * @param number the one-based sound index
   */
  setSound(number: string) {
    this.metroSound.setSound(parseInt(number, 10) + 1);
  }

  setMetric(metric: string) {
    this.metric = parseInt(metric, 10);
    this.metroSound.setMetric(parseInt(metric, 10));
  }

  setTernaire() {
    this.metroSound.setTernaire();
  }

  /** Starts the metronome if it is stopped, and vice versa. */
  toggle() {
    this.metroSound.toggle();
    this.startStopValue = this.metroSound.running ? 'Stop' : 'Test';
  }

  updateMetronome() {
    let lMetronome = this.metronome;
    lMetronome.bpm = this.bpm;
    lMetronome.metric = this.metric.toString();
    lMetronome.clickType = this.clickType.toString();
    this.metronomeService.editMetronome(lMetronome).subscribe(
      updatedMetronome => {
        this.metronome = updatedMetronome;
        this.modalService.dismissAll();
        this.metroSound.running = false;
      },
      err => console.log(err)
    );
  }

  muteMetronome() {
    this.muted = !this.muted;
    this.metroSound.cutGain(this.muted);
  }
}
