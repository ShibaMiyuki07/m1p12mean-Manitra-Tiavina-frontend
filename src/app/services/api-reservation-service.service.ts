import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reservation} from "../models/reservation";
import {UnassignedReservation} from "../models/apiResult/unassignedReservation";

@Injectable({
  providedIn: 'root'
})
export class ApiReservationServiceService {

  readonly url = "http://localhost:8888";
  constructor(private http: HttpClient) { }

  getUnassignedReservations(){
    return this.http.get<Array<UnassignedReservation>>(`${this.url}/reservations/`);
  }

  async getReservationsByMechanicId(mechanicId: any) {
      return this.http.get<Reservation[]>(`${this.url}/mechanics/${mechanicId}`);
  }
}
