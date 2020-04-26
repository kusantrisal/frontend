import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthService } from './../../service/auth/auth.service';
import { Member } from '../model/member.model';
import { Observable } from 'rxjs';
import { MemberState } from '../state/member.state';
import { RemoveMember, AddResource } from '../actions/member.actions';
import { HttpService } from '../service/http.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  @Select(state => state.member) memberState$: Observable<Member>;
  //OR use below line use use method from MemberStatus
  //@Select(MemberState.getMember) member$: Observable<Member>

  resources = [];
  selectedFile: File = null;
  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(public authService: AuthService, private store: Store, private httpService: HttpService, private fb: FormBuilder, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getResoucesByMemberUuid();
  }

  getResoucesByMemberUuid() {
    this.httpService.getResourcesByMemberUuid()
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
    console.log('Submitting for')
    console.log(this.formGroup)
    this.formGroup.value.name = this.selectedFile.name;
    this.formGroup.value.file = this.selectedFile;
    this.httpService.addResource(this.formGroup.value).subscribe(res => console.log(res));
  }

  //sample to alter state
  removeMemberFromState() {
    this.store.dispatch([new RemoveMember()]);
  }
}
