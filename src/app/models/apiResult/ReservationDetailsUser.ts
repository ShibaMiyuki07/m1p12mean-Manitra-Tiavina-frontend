import {Reservation} from "../reservation";
import {Service} from "../Service";
import {User} from "../User";

export interface ReservationDetailsUser extends Reservation{
  result : Service,
  user : User,
}
