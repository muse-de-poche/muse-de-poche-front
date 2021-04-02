import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Composer } from 'src/app/models/composer';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class ComposerService {

  readonly route: string = environment.apiUrl + '/composer';

  constructor(private http: HttpClient) { }

  create(composer:Composer):Observable<HttpResponse<Composer>> {
    return this.http.post<Composer>(this.route, composer, {observe: 'response'});
  }

  login(login:Login):Observable<HttpResponse<any>> {
    return this.http.post(this.route+'/login', login, {observe: 'response'});
  }

  all():Observable<Composer[]> {
    return this.http.get<Composer[]>(this.route);
  }

}
