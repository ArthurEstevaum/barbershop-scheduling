import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerFormComponent } from '../components/customer-form/customer-form.component';
import { Subscription } from 'rxjs';
import { CustomersService } from '../../services/customers/customers.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerModelForm } from '../customer.models';

@Component({
  selector: 'app-update-customer',
  imports: [CustomerFormComponent],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css',
})
export class UpdateCustomerComponent implements OnInit, OnDestroy {
  private httpSubscription?: Subscription;
  customer: CustomerModelForm = {
    id: 0,
    email: '',
    phoneNumber: '',
    name: '',
  };

  constructor(
    private customersService: CustomersService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private snackBar: SnackbarManagerService
  ) {}

  onSubmitCustomer(value: CustomerModelForm) {
    const { id, ...request } = value;
    if (id) {
      this.httpSubscription = this.customersService
        .update(id, request)
        .subscribe((_) => {
          this.snackBar.show('Usuário atualizado com sucesso');
          this.router.navigate(['customers/list']);
        });
    }

    this.snackBar.show("Um erro inesperado aconteceu");
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.snackBar.show('Erro ao recuperar informações do cliente');
      this.router.navigate(['customers/list']);
      return;
    }

    this.httpSubscription = this.customersService
      .showById(Number(id))
      .subscribe((data) => (this.customer = data));
  }

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }
}
