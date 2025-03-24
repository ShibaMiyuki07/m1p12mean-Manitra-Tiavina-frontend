import {Component, OnInit} from '@angular/core';
import {MenubarMechanicComponent} from "../../components/menubar-mechanic/menubar-mechanic.component";
import {Constant} from "../../models/Constant";
import {Reservation} from "../../models/reservation";
import {ApiReservationServiceService} from "../../services/api-reservation-service.service";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {UnassignedReservation} from "../../models/apiResult/unassignedReservation";

@Component({
  selector: 'app-index-mechanic',
  standalone: true,
  imports: [
    MenubarMechanicComponent,
    NgForOf,
    NgStyle,
    NgIf
  ],
  templateUrl: './index-mechanic.component.html',
  styleUrl: './index-mechanic.component.css'
})
export class IndexMechanicComponent implements OnInit {
  todayDate : Date = new Date();
  reservations: Array<UnassignedReservation> = [];
  agendas: Array<Reservation> = [];
  error : string = "";

  constructor(private reservationService:ApiReservationServiceService) {}

  ngOnInit() {
    this.reservationService.getReservationsByMechanicId("").subscribe(liste =>{
      this.agendas = liste.filter(l => this.checkDate(new Date(l.reservationDate),this.todayDate));
    });
    this.reservationService.getUnassignedReservations().subscribe(liste =>{
      this.reservations = liste;
    });

  }

  checkDate(date1: Date,date2 : Date) {
    if(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()){
      return true;
    }
    return false;
  }

  nextDate()
  {
    this.todayDate.setDate(this.todayDate.getDate() + 1);
    this.reservationService.getReservationsByMechanicId("").subscribe(liste =>{
      this.agendas = liste.filter(l => this.checkDate(new Date(l.reservationDate),this.todayDate));
      console.log(this.agendas);
    });
  }

  prevDate()
  {
    this.todayDate.setDate(this.todayDate.getDate() - 1);
    this.reservationService.getReservationsByMechanicId("").subscribe(liste =>{
      this.agendas = liste.filter(l => this.checkDate(new Date(l.reservationDate),this.todayDate));
      console.log(this.agendas);
    });
  }

  displayDate()
  {
    return this.displayDateWithoutHour(this.todayDate);
  }

  displayDateWithoutHour(date: Date)
  {
    return date.getDate() + ' ' + this.Constant.monthNames[date.getMonth()] + ' ' + date.getFullYear();
  }
  displayDateWithHour(date: any)
  {
    var toDate = new Date(date);
    return toDate.getDate() + ' ' + this.Constant.monthNames[toDate.getMonth()] + ' ' + toDate.getFullYear() + ' ' + toDate.getUTCHours();
  }

  displayHour(reservationDate : any,endReservation : any)
  {
    var reservationDatetoDate = new Date(reservationDate);
    var endReservationtoDate = new Date(endReservation);
    return reservationDatetoDate.getUTCHours() + 'h - ' + endReservationtoDate.getUTCHours() + 'h';
  }

  assign(reservation : Reservation)
  {
    var assigneable = true;
    for(let agenda of this.agendas){
      if(!this.isAssignationValid(reservation, agenda)){
        assigneable = false;
      }
    }
    if(assigneable){
      this.reservationService.updateMechanicId(reservation,"not started");
      location.reload();
    }
    else{
      this.error = "The reservation is not assignable due to another reservation already assigned at this time";
    }
  }

  isAssignationValid(reservation : Reservation,agenda : Reservation)
  {
    if(reservation.reservationDate < agenda.reservationDate && reservation.endReservation < agenda.reservationDate){
      return true;
    }
    if(reservation.reservationDate > agenda.endReservation && reservation.endReservation > agenda.endReservation){
      return true;
    }
    return false;
  }

  changeState(reservation : Reservation,status : string)
  {
    var index = 0;
    for(let i in this.Constant.status)
    {
      if(this.Constant.status[i] === status)
      {
        break;
      }
      index++;
    }
    reservation.status = this.Constant.status[index+1];
    this.reservationService.updateMechanicId(reservation,reservation.status);
    location.reload();
  }

  protected readonly Constant = new Constant();


}
