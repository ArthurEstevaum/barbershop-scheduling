import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerModelForm } from '../../customer.models';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-customer-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  @Input() customer: CustomerModelForm = { id: 0, name: "", email: "", phoneNumber: "" }
  @Output() customerSubmited = new EventEmitter<CustomerModelForm>();

  onSubmit(_: NgForm) {
    this.customerSubmited.emit(this.customer)
  }
}
