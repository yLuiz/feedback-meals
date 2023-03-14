import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() titulo: string = 'Sucesso!';
  @Input() message: string = 'Seu feedback foi registrado! ✅';
  
  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit(): void {}

}
