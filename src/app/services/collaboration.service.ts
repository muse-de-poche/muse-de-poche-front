import { Collaboration } from './../models/collaboration';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  readonly route: string = environment.apiUrl + '/workgroups';

  constructor(private http: HttpClient) { }
  
  hasTheEditingRightsOn(composerId:number, compositionId:number):Observable<Boolean> {
    return this.http.get<Boolean>(this.route+'/'+composerId+'/hasTheEditingRightsOn/'+compositionId);
  }

  create(collaboration:Collaboration):Observable<HttpResponse<Collaboration>> {
    return this.http.post<Collaboration>(this.route, collaboration, {observe: 'response'});
  }

}
