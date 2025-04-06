export interface ScheduleAppointmentMonthResponse {
  year: number,
  month: number
  scheduledAppointments: CustomerScheduleAppointementResponse[]
}

export interface CustomerScheduleAppointementResponse {
  id: number
  day: number
  startAt: Date
  endAt: Date
  customerId: number
  customerName: string
}

export interface SaveScheduleResponse {
  id: number
  startAt: Date
  endAt: Date
  customerId: number
}

export interface SaveScheduleRequest {
  startAt: Date
  endAt: Date
  customerId: number
}
