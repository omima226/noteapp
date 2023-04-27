import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _Http: HttpClient, private _Router: Router) {
    this.userData();
  }

  user: BehaviorSubject<any> = new BehaviorSubject(null);

  register(formData: object): Observable<any> {
    return this._Http.post(environment.baseUrl + 'signup', formData);
  }

  login(formData: object): Observable<any> {
    return this._Http.post(environment.baseUrl + 'signin', formData);
  }

  userData(): void {
    if (localStorage.getItem('_tokenNote')) {
      const token: string = localStorage.getItem('_tokenNote')!;
      const deToken = jwtDecode(token);
      console.log(deToken);

      this.user.next(deToken);

      this._Router.navigate(['/home']);
    }
  }
}
