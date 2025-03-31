import {Product} from "../product";
import {Stock} from "../stock";

export interface ProductStock extends Product {
  result : Stock;
}
