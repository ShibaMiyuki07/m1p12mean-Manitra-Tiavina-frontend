export interface Promotion {
  _id?: string;
  name: string;
  description: string;
  discount: number;
  products: string[] | any[];
  services: string[] | any[];
  validFrom: Date | string;
  validUntil: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}
