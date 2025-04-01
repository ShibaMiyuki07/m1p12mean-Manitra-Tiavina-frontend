import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Promotion} from "../../models/Promotion";
import {PromotionCheckResult} from "../../models/apiResult/PromotionCheckResult";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl = `${environment.apiUrl}/promotions`;

  constructor(private http: HttpClient) { }

  createPromotion(promotionData: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(this.apiUrl, promotionData);
  }

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.apiUrl);
  }

  getPromotionById(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.apiUrl}/${id}`);
  }

  updatePromotion(id: string, updateData: Partial<Promotion>): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.apiUrl}/${id}`, updateData);
  }

  deletePromotion(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getActivePromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.apiUrl}/active`);
  }

  checkProductPromotion(productId: string): Observable<PromotionCheckResult> {
    return this.http.get<PromotionCheckResult>(`${this.apiUrl}/check/product/${productId}`);
  }

  checkServicePromotion(serviceId: string): Observable<PromotionCheckResult> {
    return this.http.get<PromotionCheckResult>(`${this.apiUrl}/check/service/${serviceId}`);
  }

  getPromotionWithHighestDiscount(): Observable<Promotion | null> {
    return this.http.get<Promotion[]>(`${this.apiUrl}/active`).pipe(
      map(promotions => {
        if (promotions.length === 0) return null;

        // Trouve la promotion avec le plus grand discount
        return promotions.reduce((prev, current) =>
          (prev.discount > current.discount) ? prev : current
        );
      })
    );
  }

  formatPromotion(promotion: Promotion): any {
    return {
      ...promotion,
      validFrom: new Date(promotion.validFrom).toLocaleDateString(),
      validUntil: new Date(promotion.validUntil).toLocaleDateString(),
      discountFormatted: `${promotion.discount}%`,
      isActive: this.isPromotionActive(promotion)
    };
  }

  isPromotionActive(promotion: Promotion): boolean {
    const now = new Date();
    const validFrom = new Date(promotion.validFrom);
    const validUntil = new Date(promotion.validUntil);
    return now >= validFrom && now <= validUntil;
  }
}
