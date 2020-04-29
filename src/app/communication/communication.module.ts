import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessangerComponent } from './messanger/messanger.component';



@NgModule({
  declarations: [ MessangerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MessangerComponent
  ]
})
export class CommunicationModule { }
