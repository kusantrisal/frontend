import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  memberInfo = {};
  ngOnInit(): void {

    this.httpService.getMember().subscribe(
      res => this.memberInfo = res,
      err => {
        console.log('Error' + err.message);
        this.httpService.createMember().subscribe(
          res => this.memberInfo = res,
          err => {
            console.log("Unable to create member " + err.message);
          });
      });

    this.httpService.testApi().subscribe(
      res => { console.log('Getting response'); this.memberInfo = res; },
      error => { console.log('Getting Error ' + error); },
      () => console.log('Completed'));
  }

}
