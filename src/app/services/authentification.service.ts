import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Composer } from '../models/composer';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  readonly route: string = environment.apiUrl + '/composer';

  constructor(private http: HttpClient, private router: Router) { }

  login(login: Login): Observable<HttpResponse<any>> {
    return this.http.post(this.route + '/login', login, { observe: 'response' });
  }

  isSignin(): boolean {
    return sessionStorage.length == 1;
  }

  getConnected():Composer {
    return this.isSignin ? JSON.parse(sessionStorage.getItem('composer')) : null;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

}
