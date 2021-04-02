import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Collaboration } from '../models/collaboration';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  readonly route: string = environment.apiUrl + '/workgroups';

  constructor(private http: HttpClient) { }
  
  create(collaboration: Collaboration):Observable<Collaboration> {
    return this.http.post<Collaboration>(this.route, collaboration);
  }

  hasTheEditingRightsOn(composerId:number, compositionId:number):Observable<Boolean> {
    return this.http.get<Boolean>(this.route+'/'+composerId+'/hasTheEditingRightsOn/'+compositionId);
  }

  getCollaborationsByComposer(composerId: number):Observable<Collaboration[]> {
    return this.http.get<Collaboration[]>(this.route+'/byComposer/'+composerId);
  }

  getCollaborationsByComposition(compositionId: number):Observable<Collaboration[]> {
    return this.http.get<Collaboration[]>(this.route+'/byComposition/'+compositionId);
  }

  ban(collaboration: Collaboration): Observable<Collaboration> {
    collaboration.status = "BANNED";
    return this.http.put<Collaboration>(this.route+'/'+collaboration.id, collaboration);
  }

}
