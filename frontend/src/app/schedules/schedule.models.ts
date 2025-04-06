export interface ScheduleAppointmentMonthModel {
  year: number,
  month: number,
  scheduledAppointments: CustomerScheduleAppointmentModel[]
}

export interface CustomerScheduleAppointmentModel {
  id: number,
  day: number,
  startAt: Date,
  endAt: Date,
  customerId: number,
  customerName: string
}

export interface CustomerScheduleAppointmentDetailModel {
  id: number,
  name: string,
  email: string,
  phoneNumber: string,
}

export interface SaveScheduleResponse {
  id: number
  startAt: Date
  endAt: Date
  clientId: number
}

export interface SaveScheduleRequest {
  startAt: Date,
  endAt: Date,
  customerId: number
}

export interface SaveScheduleModel {
  startAt?: Date
  endAt?: Date
  customerId?: number
}

export interface SelectCustomerModel {
  id: number,
  name: string
}
