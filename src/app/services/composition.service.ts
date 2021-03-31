import { Composer } from 'src/app/models/composer';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Composition } from 'src/app/models/composition';

@Injectable({
  providedIn: 'root'
})
export class CompositionService {

  readonly route: string = environment.apiUrl + '/composition';

  constructor(private http: HttpClient) {
    
  }

  getMostViewedCompositions():Observable<Composition[]> {
    return this.http.get<Composition[]>(this.route+'/plays-number');
  }

  getRecentlyAddedCompositions():Observable<Composition[]> {
    return this.http.get<Composition[]>(this.route+'/created-date');
  }

  getLastUpdatedCompositions():Observable<Composition[]> {
    return this.http.get<Composition[]>(this.route+'/update-date');
  }

  getCompositionByComposer(id: number):Observable<Composition[]> {
    return this.http.get<Composition[]>(this.route+'/composer/'+id);
  }
  
  getCompositionById(id: number):Observable<Composition> {
    return this.http.get<Composition>(this.route+'/'+id);
  }

}
