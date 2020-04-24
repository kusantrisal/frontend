import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService, private router: Router) { }

  isAuthenticated() {
    // console.log(new Date(localStorage.getItem('expires')).toLocaleString('en-US', {timeZone: 'America/New_York'}));
    // console.log(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}));
    // console.log(new Date(localStorage.getItem('expires')) > new Date());
    return !!sessionStorage.getItem('access_token');
  //  && new Date(localStorage.getItem('expires')) > new Date();
  }

  refreshToken() {
    return this.httpService.refreshToken();
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('expires');
    this.router.navigate(['/home']);
  }
}
