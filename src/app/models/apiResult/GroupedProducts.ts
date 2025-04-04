import {Product} from "../product";

export interface GroupedProducts {
  category: string;
  productCount: number;
  products: Product[];
}
