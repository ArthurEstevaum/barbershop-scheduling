export interface SaveCustomerRequest {
  name: string,
  email: string,
  phoneNumber: string
}

export interface UpdateCustomerRequest {
  name: string,
  email: string,
  phoneNumber: string
}

export interface SaveCustomerResponse {
  id: number,
  name: string,
  email: string,
  phoneNumber: string
}

export interface UpdateCustomerResponse {
  id: number,
  name: string,
  email: string,
  phoneNumber: string
}

export interface ListCustomerResponse {
  id: number,
  name: string,
  email: string,
  phoneNumber: string
}

export interface InfoCustomerResponse {
  id: number,
  name: string,
  email: string,
  phoneNumber: string
}
