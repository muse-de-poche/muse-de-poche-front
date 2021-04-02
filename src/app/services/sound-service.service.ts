import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sound } from '../models/sound';

@Injectable({
  providedIn: 'root'
})
export class SoundServiceService {

  private soundObservable = new Subject<String>();

 soundObservable$ = this.soundObservable.asObservable();

 readonly route: string = environment.apiUrl + '/sound';

  constructor(private http: HttpClient) { }

  createSound(id: number, blob: Blob): Observable<Sound> {
    const formData = new FormData();
    formData.append('file', blob);

    return this.http.post<any>(this.route+'/'+id, formData);
  }

  deleteSound(id: number): Observable<any> {
    return this.http.delete(this.route + '/' + id);
  }

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
