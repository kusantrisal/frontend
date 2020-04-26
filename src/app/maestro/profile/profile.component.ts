import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { AddMember } from '../actions/member.actions';
import { Store } from '@ngxs/store';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private httpService: HttpService, private store: Store, private router: Router) { }
  memberInfo = {};
  ngOnInit(): void {
    //create user in maestro portal if it doesn't exist already
    this.httpService.getMember().subscribe(res => { this.memberInfo = res; this.addMemberToStore(res); }, err => {
      this.httpService.createMember().subscribe(res => this.memberInfo = res, err => console.log(err))
    });

  }

  addMemberToStore(member) {
    this.store.dispatch([new AddMember(member)]);
  }

  getResources() {
    this.router.navigate(["/maestro/resource"]);
  }
}
