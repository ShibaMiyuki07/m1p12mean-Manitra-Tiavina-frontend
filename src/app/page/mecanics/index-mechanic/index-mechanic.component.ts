import {Component, inject, NgModule, OnInit} from '@angular/core';
import {MenubarMechanicComponent} from "../../../components/menubar-mechanic/menubar-mechanic.component";
import {Constant} from "../../../models/Constant";
import {Reservation} from "../../../models/reservation";
import {ApiReservationServiceService} from "../../../services/reservationApi/api-reservation-service.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {UnassignedReservation} from "../../../models/apiResult/unassignedReservation";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AgendaComponent} from "../../../components/agenda/agenda.component";

@Component({
  selector: 'app-index-mechanic',
  standalone: true,
  imports: [
    MenubarMechanicComponent,
    NgForOf,
    NgIf,
    AgendaComponent,
    DatePipe
  ],
  templateUrl: './index-mechanic.component.html',
  styleUrl: './index-mechanic.component.css'
})
export class IndexMechanicComponent implements OnInit {
  reservations: Array<UnassignedReservation> = [];
  authService : AuthService = inject(AuthService);
  error : string = "";
  mechanicId: string | null = null;
  router : Router = inject(Router);

  constructor(private reservationService:ApiReservationServiceService) {}

  ngOnInit() {

    this.mechanicId = this.authService.getUserId();
    this.reservationService.getUnassignedReservations().subscribe(liste =>{
      this.reservations = liste;
    });

  }



  assign(reservation : Reservation)
  {
    this.reservationService.getReservationsByMechanicId(this.mechanicId).subscribe(liste =>{
      const MyAgenda = liste;
      let assignable = true;
      for(let agenda of MyAgenda){
        if(!this.isAssignationValid(reservation, agenda)){
          assignable = false;
        }
      }
      if(assignable){
        reservation.mechanicId = this.mechanicId;
        this.reservationService.updateReservationById(reservation,"not started");
        location.reload();
      }
      else{
        this.error = "The reservation is not assignable due to another reservation already assigned at this time";
        alert(this.error);
      }
    });

  }

  isAssignationValid(reservation : Reservation,agenda : Reservation)
  {
    if(reservation.reservationDate < agenda.reservationDate && reservation.endReservation < agenda.reservationDate){
      return true;
    }
    else if(reservation.reservationDate > agenda.endReservation && reservation.endReservation > agenda.endReservation){
      return true;
    }
    return false;
  }



}
