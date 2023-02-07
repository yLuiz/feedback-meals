import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-refeicao',
  templateUrl: './menu-refeicao.component.html',
  styleUrls: ['./menu-refeicao.component.scss']
})
export class MenuRefeicaoComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  goToFeedback() {
    this.router.navigate(['/feedback'])
  }

  ngOnInit(): void {}

}
