import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundServiceService {

  private soundObservable = new Subject<String>();

 soundObservable$ = this.soundObservable.asObservable();

  constructor() { }


  startPlay(play: string) {
    this.soundObservable.next(play);
  }
  stopPlay(stop: string) {
    this.soundObservable.next(stop);
  }
  skipBackward(backward: string) {
    this.soundObservable.next(backward);
  }
  skipForward(forward: string) {
    this.soundObservable.next(forward);
  }
}
