import { HttpClient } from '@angular/common/http';
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

}
