import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Metronome } from '../models/metronome';

@Injectable({
  providedIn: 'root'
})
export class MetronomeService {

  route: String = environment.apiUrl + '/metronome';

  constructor(private http: HttpClient) { }

  editMetronome(metronome: Metronome): Observable<Metronome> {
    return this.http.put<Metronome>(this.route + '/'+ metronome.id, metronome);
  }
}
