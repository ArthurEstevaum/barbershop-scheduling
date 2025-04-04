import { Component, OnDestroy } from '@angular/core';
import { CustomerFormComponent } from "../components/customer-form/customer-form.component";
import { CustomerModelForm } from '../customer.models';
import { CustomersService } from '../../services/customers/customers.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-new-customer',
  imports: [CustomerFormComponent],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnDestroy {

  private httpSubscription?: Subscription

  constructor(private customersService: CustomersService, private readonly router: Router, private snackBar: SnackbarManagerService) {}

  onSubmitCustomer(value: CustomerModelForm) {
    const { id, ...request } = value

    this.customersService.save(request).subscribe(_ => {
      this.snackBar.show("Usuário cadastrado com sucesso")
      this.router.navigate(["customers/list"])
    })
  }

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe()
    }
  }
}
