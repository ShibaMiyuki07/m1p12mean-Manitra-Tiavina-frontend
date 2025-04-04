export interface CartServiceResult {
  _id: string;
  serviceId: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    isInPromotion?: boolean;
    promotion?: {
      _id: any;
      name: string;
      description: string;
      discount: number;
      products: any;
      services: any;
      validFrom: Date;
      validUntil: Date;
      createdAt: Date;
      updatedAt: Date;
    };
  };
  date: Date;
}
