import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarManagerService {

  constructor(private readonly snackBar: MatSnackBar) { }

  show(message: string, action: string = "fechar", duration: number = 3000) : void {
    this.snackBar.open(message, action, { duration, verticalPosition: "top", horizontalPosition: 'right' })
  }
}
