import {Component, OnInit} from '@angular/core';
import {MenubarMechanicComponent} from "../../components/menubar-mechanic/menubar-mechanic.component";
import {Constant} from "../../models/Constant";
import {Reservation} from "../../models/reservation";
import {ApiReservationServiceService} from "../../services/api-reservation-service.service";
import {NgForOf} from "@angular/common";
import {UnassignedReservation} from "../../models/apiResult/unassignedReservation";

@Component({
  selector: 'app-index-mechanic',
  standalone: true,
  imports: [
    MenubarMechanicComponent,
    NgForOf
  ],
  templateUrl: './index-mechanic.component.html',
  styleUrl: './index-mechanic.component.css'
})
export class IndexMechanicComponent implements OnInit {
  todayDate : Date = new Date();
  reservations: Array<UnassignedReservation> = [];

  constructor(private reservationService:ApiReservationServiceService) {}

  ngOnInit() {
    this.reservationService.getUnassignedReservations().subscribe(liste =>{
      this.reservations = liste;
      console.log(this.reservations);
    });
  }

  nextDate()
  {
    this.todayDate.setDate(this.todayDate.getDate() + 1);
  }

  prevDate()
  {
    this.todayDate.setDate(this.todayDate.getDate() - 1);
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
    return toDate.getDate() + ' ' + this.Constant.monthNames[toDate.getMonth()] + ' ' + toDate.getFullYear() + ' ' + toDate.getUTCHours() + ':' + toDate.getMinutes();
  }

  protected readonly Constant = new Constant();


}
