import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reservation} from "../models/reservation";
import {UnassignedReservation} from "../models/apiResult/unassignedReservation";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiReservationServiceService {

  readonly url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUnassignedReservations(){
    return this.http.get<Array<UnassignedReservation>>(`${this.url}/reservations/`);
  }

  getReservationsByMechanicId(mechanicId: any) {
      return this.http.get<Reservation[]>(`${this.url}/reservations/mechanics/${mechanicId}`);
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
