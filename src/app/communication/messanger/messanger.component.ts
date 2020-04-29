import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../service/websocket/websocket.service';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.css']
})
export class MessangerComponent implements OnInit , OnDestroy{

  wsObservable = this.wsService.getWebSocket()
  socketOpen: boolean = true;
  constructor(private wsService: WebsocketService) { }


  ngOnInit(): void {
    this.connectWs();
  }

  ngOnDestroy(): void {
 
  }

  sendMsg() {
    //  this.wsService.getWebSocket()
    console.log(this.socketOpen)
    try {
      if (this.socketOpen) {
        this.wsService.sendToServer('Hello World');
      } else if (this.connectWs()) {
        this.wsService.sendToServer('Hello World');
      } else {
        console.error('Unable to send message. Connection down')
      }

    } catch (e) {
      console.log(e)
    }
  }

  connectWs() {
    console.log('Connectecting to socket')
    this.wsObservable.subscribe(
      res => {
        console.log(res);
        this.socketOpen = true
      },
      err => {
        console.log("Something went wrong" + err);
        this.socketOpen = false;
      }
    );
    return this.socketOpen;
  }
}
