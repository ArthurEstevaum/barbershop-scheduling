import { Routes } from '@angular/router';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { ListCustomersComponent } from './customers/list-customers/list-customers.component';
import { SchedulesMonthComponent } from './schedules/schedules-month/schedules-month.component';

export const routes: Routes = [
  { path: "customers/update/:id", component: UpdateCustomerComponent, data: {title: "Atualizar cliente"} },
  { path: "customers/new-customer", component: NewCustomerComponent, data: {title: "Cadastrar cliente"} },
  { path: "customers", component: ListCustomersComponent, data: {title: "Clientes cadastrados"} },
  { path: "schedules/month", component: SchedulesMonthComponent, data: {title: "Agendamentos"} },
  { path: "**", redirectTo: "schedules/month" }
];
