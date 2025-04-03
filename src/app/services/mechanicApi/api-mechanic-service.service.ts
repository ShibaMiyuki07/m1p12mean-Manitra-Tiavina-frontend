import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, map, lastValueFrom} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Mechanic, AvailabilityCheck, DaySchedule} from "../../models/mechanic";

@Injectable({
  providedIn: 'root'
})
export class MechanicService {
  private apiUrl = `${environment.apiUrl}/mechanics`;

  constructor(private http: HttpClient) { }

  createMechanic(mechanicData: Omit<Mechanic, '_id' | 'createdAt' | 'updatedAt'>): Observable<Mechanic> {
    return this.http.post<Mechanic>(this.apiUrl, mechanicData);
  }

  getMechanic(id: string): Observable<Mechanic> {
    return this.http.get<Mechanic>(`${this.apiUrl}/${id}`);
  }

  updateMechanic(id: string, updates: Partial<Mechanic>): Observable<Mechanic> {
    return this.http.put<Mechanic>(`${this.apiUrl}/${id}`, updates);
  }

  deleteMechanic(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Fonctions spécifiques
  checkMechanicAvailability(mechanicId: string, date: Date): Observable<boolean> {
    const isoDate = date.toISOString();
    return this.http.get<{ available: boolean }>(
      `${this.apiUrl}/${mechanicId}/check-availability/${isoDate}`
    ).pipe(
      map(response => response.available)
    );
  }

  getAvailableMechanics(date: Date): Observable<Mechanic[]> {
    const isoDate = date.toISOString();
    return this.http.get<Mechanic[]>(`${this.apiUrl}/available/${isoDate}`);
  }

  // Utilitaires pour le calendrier
  getMechanicSchedule(mechanicId: string): Observable<DaySchedule[]> {
    return this.getMechanic(mechanicId).pipe(
      map(mechanic => mechanic.schedule)
    );
  }

  // Version optimisée pour plusieurs vérifications
  checkMultipleMechanicsAvailability(mechanicIds: string[], date: Date): Observable<{ [id: string]: boolean }> {
    const isoDate = date.toISOString();
    return this.http.post<{ [id: string]: boolean }>(
      `${this.apiUrl}/check-multiple-availability`,
      { mechanicIds, date: isoDate }
    );
  }

}
