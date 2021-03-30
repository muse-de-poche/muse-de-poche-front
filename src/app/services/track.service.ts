import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  readonly route: string = environment.apiUrl + '/track';

  constructor(private http: HttpClient) { }

  createTrack(track: Track): Observable<Track> {
    return this.http.post<Track>(this.route, track);
  }
}
