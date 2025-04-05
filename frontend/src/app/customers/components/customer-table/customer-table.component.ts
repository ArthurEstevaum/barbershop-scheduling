import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerModelForm, CustomerModelTable } from '../../customer.models';
import { Subscription } from 'rxjs';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../shared/yes-no-dialog/yes-no-dialog.component';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-customer-table',
  imports: [MatTableModule, MatIcon, MatPaginatorModule],
  providers: [{ provide: MatPaginator, useClass: CustomPaginator }],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css',
})
export class CustomerTableComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() customers: CustomerModelTable[] = [];
  @Output() onConfirmDelete = new EventEmitter<CustomerModelTable>();
  @Output() onRequestUpdate = new EventEmitter<CustomerModelTable>();

  dataSource!: MatTableDataSource<CustomerModelTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'actions'];

  private dialogServiceSubscription?: Subscription;

  constructor(private readonly dialogService: DialogManagerService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customers'] && this.customers) {
      this.dataSource = new MatTableDataSource<CustomerModelTable>(
        this.customers
      );

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }
  ngOnDestroy(): void {
    if (this.dialogServiceSubscription) {
      this.dialogServiceSubscription.unsubscribe();
    }
  }

  updateCustomer(customer: CustomerModelTable) {
    this.onRequestUpdate.emit(customer)
  }
  deleteCustomer(customer: CustomerModelTable) {
    this.dialogService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão de cliente',
        content: `Confirma a exclusão do cliente ${customer.name}`,
      })
      .subscribe(result => {
        if(result) {
          this.onConfirmDelete.emit(customer)
          const updatedList = this.dataSource.data.filter(c => c.id !== customer.id)

          this.dataSource = new MatTableDataSource<CustomerModelTable>(updatedList)
        }
      });
  }
  formatPhone(phoneNumber: string) {
    return `( ${phoneNumber.substring(0, 2)} ) ${phoneNumber.substring(
      2,
      7
    )} - ${phoneNumber.substring(7)}`;
  }
}
