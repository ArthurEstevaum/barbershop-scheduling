import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-yes-no-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.css'
})
export class YesNoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) readonly data: any) {}
}
