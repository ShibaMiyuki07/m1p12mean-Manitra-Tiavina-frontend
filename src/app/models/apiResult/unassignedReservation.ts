import {Reservation} from "../reservation";
import {Service} from "../Service";

export interface UnassignedReservation extends Reservation {
  result : Service;
}
