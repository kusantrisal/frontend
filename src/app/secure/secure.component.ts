import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  response: any;

  ngOnInit(): void {
    this.httpService.getUser().subscribe(res => {
      console.log(res);
      this.response = res;
    }, err => {
      this.router.navigate(['/signin']);
    });
  }

}
