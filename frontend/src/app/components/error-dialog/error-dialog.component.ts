import { Component, OnInit } from '@angular/core';
import { ErrorDialogService } from './error-dialog.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor(
    public errorDialogService: ErrorDialogService
  ) { }

  ngOnInit(): void {
  }

}
