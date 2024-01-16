export interface ProcessPaymentArgs {
  firstName: string;
  lastName: string;
  cardNumber: string;
  cardExpiryMonth: number;
  cardExpiryYear: number;
  amount: number;
  email: string;
  phoneNumber: string;
  address: BillingAddress;
}

export interface BillingAddress {
  address1: string;
  locality: string;
  administrativeArea: string;
  postalCode: string;
  country: string;
}
