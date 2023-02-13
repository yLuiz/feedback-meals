import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'feedback-meals';

  constructor(private socket: Socket) {}

  getMessage() {
    return this.socket.on('message', (data: any) => {
      console.log(data);
    });
  };

  ngOnInit(): void {
    this.getMessage();
  }
}
