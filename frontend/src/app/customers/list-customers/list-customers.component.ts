import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerTableComponent } from '../components/customer-table/customer-table.component';
import { CustomersService } from '../../services/customers/customers.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { CustomerModelTable } from '../customer.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customers',
  imports: [CustomerTableComponent],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css',
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];
  customers: CustomerModelTable[] = [];
  constructor(
    private readonly customersService: CustomersService,
    private readonly snackbarService: SnackbarManagerService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.customersService.list().subscribe(data => this.customers = data)
    );
  }
  ngOnDestroy(): void {
    this.httpSubscriptions?.forEach((s) => s.unsubscribe());
  }

  update(customer: CustomerModelTable) {
    this.router.navigate(['customers/update-customer', customer.id])
  }

  delete(customer: CustomerModelTable) {
    this.httpSubscriptions.push(
      this.customersService
        .delete(customer.id)
        .subscribe((_) =>
          this.snackbarService.show(
            `O cliente ${customer.name} foi excluído com sucesso`
          )
        )
    );
  }
}
