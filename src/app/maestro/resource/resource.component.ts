import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthService } from './../../service/auth/auth.service';
import { Member } from '../model/member.model';
import { Observable } from 'rxjs';
import { MemberState } from '../state/member.state';
import { RemoveMember, AddResource } from '../actions/member.actions';
import { HttpService } from '../service/http.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { first } from 'rxjs/operators'
import { HttpEventType } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  @Select(state => state.member.resources) memberState$;
  //OR use below line use use method from MemberStatus
  //@Select(MemberState.getMember) member$: Observable<Member>

  resources = [];
  selectedFile: File = null;
  formGroup = this.fb.group({
    file: [null, Validators.required]
  });
  value = 0;
  constructor(public authService: AuthService, private store: Store, private httpService: HttpService, private fb: FormBuilder, private cd: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
    this.memberState$.pipe(first()).subscribe(res => { console.log(res); if (res.length == 0) this.getResoucesByMemberUuid(); })

  }

  getResoucesByMemberUuid() {
    this.httpService.getResourcesByMemberUuid()
      .pipe(first())
      .subscribe(
        res => { this.resources.concat(res); this.addResourcesToStore(res); },
        err => console.log(err));

  }

  addResourcesToStore(resources) {
    this.store.dispatch([new AddResource(resources)]);
  }


  //file upload
  onFileSelected(event) {
    //  console.log(this.formGroup)
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    this.value = 0;
    this.formGroup.value.name = this.selectedFile.name;
    this.formGroup.value.file = this.selectedFile;
    this.httpService.addResource(this.formGroup.value).subscribe(
      events => {
        if (events.type === HttpEventType.UploadProgress) {
       //   console.log(Math.round(events.loaded / events.total * 100) + '%');
          this.value = Math.round(events.loaded / events.total * 100);

        } else if (events.type === HttpEventType.Response) {
          this.getResoucesByMemberUuid();
        }

      }
    );
  }

  //sample to alter state
  removeMemberFromState() {
    this.store.dispatch([new RemoveMember()]);
  }
}
