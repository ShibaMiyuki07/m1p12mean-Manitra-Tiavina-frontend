import {Promotion} from "../Promotion";

export interface PromotionCheckResult {
  isInPromotion: boolean;
  promotion?: Promotion;
}
