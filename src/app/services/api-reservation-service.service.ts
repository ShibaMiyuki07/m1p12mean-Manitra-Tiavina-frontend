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

  getReservationsByMechanicId(mechanicId: any) {
      return this.http.get<Reservation[]>(`${this.url}/reservations/mechanics/65f8e8b1e4b1a2b3c4d5e6fa`);
  }

  updateMechanicId(reservation:Reservation,status:string) {
      this.http.put(`${this.url}/reservations/${reservation._id}`,
        {
          mechanicId : reservation.mechanicId,
          userId : reservation.userId,
          serviceId : reservation.serviceId,
          status : status,
          endReservation : reservation.endReservation,
          reservationDate : reservation.reservationDate,
          createdAt : reservation.createdAt,
          updatedAt : new Date()

        }).subscribe(val => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }

      );
  }
}
