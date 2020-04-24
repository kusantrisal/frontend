import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { }

  loginForm = this.fb.group({
    username: ['kush', Validators.required],
    password: ['pass'],
    grantType: ['password']
  });

  ngOnInit(): void { }

  signIn() {
    this.httpService.signIn(this.loginForm).subscribe(res => {
      console.log(res);
      sessionStorage.setItem('access_token', res.access_token as string);
      sessionStorage.setItem('refresh_token', res.refresh_token as string);
      sessionStorage.setItem('expires', res.expires);
      this.router.navigate(['/secure']);
    }, err => {
      console.error(err);
    });
  }

}
