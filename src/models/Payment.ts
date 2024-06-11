export interface PaymentDto {
  cardNumber: string;
  expireDate: Date;
  cardHolderName: string;
  CVV?: number;
}
