import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import {
  CustomerScheduleAppointmentModel,
  SaveScheduleModel,
  SaveScheduleRequest,
  ScheduleAppointmentMonthModel,
  SelectCustomerModel,
} from '../../schedule.models';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { YesNoDialogComponent } from '../../../shared/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-schedule-calendar',
  imports: [
    FormsModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.css',
})
export class ScheduleCalendarComponent
  implements OnInit, AfterViewInit, OnChanges
{
  private subscription?: Subscription;
  private _selected: Date = new Date();
  displayedColumns: string[] = ['startAt', 'endAt', 'customer', 'actions'];
  dataSource!: MatTableDataSource<CustomerScheduleAppointmentModel>;
  addingSchedule: boolean = false;

  newSchedule: SaveScheduleModel = {
    startAt: undefined,
    endAt: undefined,
    customerId: undefined,
  };

  customerSelectFormControl = new FormControl();

  @Input() monthSchedule!: ScheduleAppointmentMonthModel;
  @Input() customers: SelectCustomerModel[] = [];

  @Output() onDateChange = new EventEmitter<Date>();
  @Output() onScheduleCustomer = new EventEmitter<SaveScheduleRequest>();
  @Output() onConfirmDelete = new EventEmitter<CustomerScheduleAppointmentModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly dialogService: DialogManagerService) {}

  get selected(): Date {
    return this._selected;
  }

  set selected(selected: Date) {
    if (this._selected.getTime() !== selected.getTime()) {
      this.onDateChange.emit(selected);
      this.buildTable();
      this._selected = selected;
    }
  }

  ngOnInit(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthSchedule'] && this.monthSchedule) {
      this.buildTable();
    }
  }

  private buildTable() {
    const appointments = this.monthSchedule.scheduledAppointments.filter(
      (a) =>
        this.monthSchedule.year === this._selected.getFullYear() &&
        this.monthSchedule.month - 1 === this._selected.getMonth() &&
        a.day === this._selected.getDate()
    );
    this.dataSource = new MatTableDataSource<CustomerScheduleAppointmentModel>(
      appointments
    );

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onSubmit(form: NgForm) {
    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);

    startAt.setHours(
      this.newSchedule.startAt!.getHours(),
      this.newSchedule.startAt!.getMinutes()
    );
    endAt.setHours(
      this.newSchedule.endAt!.getHours(),
      this.newSchedule.endAt!.getMinutes()
    );

    const saved: CustomerScheduleAppointmentModel = {
      id: -1,
      day: this._selected.getDate(),
      startAt,
      endAt,
      customerId: this.newSchedule.customerId!,
      customerName: this.customers.find(
        (c) => c.id === this.newSchedule.customerId
      )!.name,
    };

    this.onScheduleCustomer.emit(saved);
    this.buildTable();
    form.resetForm();
    this.newSchedule = {
      startAt: undefined,
      endAt: undefined,
      customerId: undefined,
    };
  }

  requestDelete(schedule: CustomerScheduleAppointmentModel) {
    this.dialogService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão de agendamento',
        content: 'Confirma a exclusão do agendamento?',
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(schedule);
          const updatedList = this.dataSource.data.filter(
            (c) => c.id !== schedule.id
          );
          this.dataSource =
            new MatTableDataSource<CustomerScheduleAppointmentModel>(
              updatedList
            );

          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        }
      });
  }

  onTimeChange(time: Date) {
    const endAt = new Date(time);
    endAt.setHours(time.getHours() + 1);
    this.newSchedule.endAt = endAt;
  }
}
