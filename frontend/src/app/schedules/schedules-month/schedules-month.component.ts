import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduleCalendarComponent } from '../components/schedule-calendar/schedule-calendar.component';
import { SchedulesService } from '../../services/schedules/schedules.service';
import { CustomersService } from '../../services/customers/customers.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { CustomerScheduleAppointmentModel, SaveScheduleModel, SaveScheduleRequest, ScheduleAppointmentMonthModel, SelectCustomerModel } from '../schedule.models';
import { SaveCustomerRequest } from '../../services/customers/customers.types';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.css',
})
export class SchedulesMonthComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private selectedDate?: Date
  monthSchedule!: ScheduleAppointmentMonthModel
  customers: SelectCustomerModel[] = []

  constructor(
    private readonly scheduleService: SchedulesService,
    private readonly customersService: CustomersService,
    private readonly snackBarService: SnackbarManagerService
  ) {}

  ngOnInit(): void {
    this.fetchSchedules(new Date());
    this.subscriptions.push(this.customersService.list().subscribe(data => this.customers = data))
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  onDateChange(date: Date) {
    this.selectedDate = date
    this.fetchSchedules(date)
  }

  onConfirmDelete(schedule: CustomerScheduleAppointmentModel) {
    this.subscriptions.push(this.scheduleService.delete(schedule.id).subscribe())
  }

  onScheduleCustomer(schedule: SaveScheduleModel) {
    if(schedule.startAt && schedule.endAt && schedule.customerId) {
      const request: SaveScheduleRequest = { startAt: schedule.startAt, endAt: schedule.endAt, customerId: schedule.customerId }
      this.subscriptions.push(this.scheduleService.save(request).subscribe(() => {
        this.snackBarService.show('Agendamento realizado com sucesso')
        if(this.selectedDate) {
          this.fetchSchedules(this.selectedDate)
        }
      }))
    }
  }

  private fetchSchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(this.scheduleService.listInMonth(year, month).subscribe(data => this.monthSchedule = data));
  }
}
