export interface PaymentDto {
  CardNumber: string;
  ExpireDate: Date;
  CardHolderName: string;
  CVV?: number;
}
