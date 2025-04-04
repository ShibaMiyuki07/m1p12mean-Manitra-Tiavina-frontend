export interface CartProduct {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
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
  quantity: number;
}
