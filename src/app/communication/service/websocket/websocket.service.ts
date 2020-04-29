import { Injectable, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Message {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  subject = webSocket(environment.CHAT_URL);
  myWebSocket: WebSocketSubject<Message> = webSocket('ws://localhost:3000');
  constructor() { }

  getWebSocket() {
    return this.myWebSocket.asObservable();
  }

  sendToServer(message) {
    console.log('Sending Message')
    this.myWebSocket.next({ message: 'yoyo' });
  }
}
