import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-card-header',
  imports: [MatCard, MatCardHeader, MatCardTitle],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.css'
})
export class CardHeaderComponent {

}
