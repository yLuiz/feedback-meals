import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  titulo: string = 'Sucesso!';
  message: string = 'Seu feedback foi registrado! ✅';

  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit(): void {}

}
