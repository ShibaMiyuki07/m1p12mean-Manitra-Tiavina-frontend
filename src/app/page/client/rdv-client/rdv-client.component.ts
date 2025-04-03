import {Component, ChangeDetectionStrategy, OnInit, inject} from '@angular/core';
import { isSameDay, isSameMonth} from 'date-fns';
import {of, Subject} from 'rxjs';
import {CalendarEvent, CalendarModule, CalendarView,} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {DatePipe, NgSwitch, NgSwitchCase} from "@angular/common";
import {AppModules} from "../../../app.modules";
import {AuthService} from "../../../services/auth.service";
import {ApiReservationServiceService} from "../../../services/reservationApi/api-reservation-service.service";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {HeaderComponent} from "../../../components/header/header.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {ReservationDetailsUser} from "../../../models/apiResult/ReservationDetailsUser";

const colors: Record<string, EventColor> = {
  "not started": {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  "finished": {
    primary: '#16fa16',
    secondary: '#D1E8FF',
  },
  "pending": {
    primary: '#084de3',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-rdv-client',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl : "./rdv-client.component.css",
  templateUrl: 'rdv-client.component.html',
  imports: [
    CalendarModule,
    NgSwitch,
    AppModules,
    NgSwitchCase,
    LoaderComponent,
    HeaderComponent,
    FooterComponent
  ],
  standalone: true
})
export class RdvClientComponent implements OnInit {

  readonly currentActiveMenu = "rdv"
  private readonly  reservationService = inject(ApiReservationServiceService);
  private readonly authService : AuthService = inject(AuthService);
  private readonly clientId = this.authService.getUserId();
  private readonly datePipe: DatePipe = inject(DatePipe);

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  reservations : Array<ReservationDetailsUser> = [];
  events: CalendarEvent[] = [];
  isOpen : boolean = false;
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;


  ngOnInit(): void {
    this.reservationService.getReservationsByUserId(this.clientId).subscribe(reservations => {
      this.reservations = reservations;
      for (let reservation of reservations) {
        this.events.push({
          id : reservation._id,
          start: new Date(reservation.reservationDate),
          end: new Date(reservation.endReservation),
          title: `${reservation.result.name} - ${reservation.result.description} ${this.datePipe.transform(reservation.reservationDate,"HH:mm")} - ${this.datePipe.transform(reservation.endReservation,"HH:mm")}` ,
          color: { ...colors[reservation.status] }
        })
      }
    })
  }



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  protected readonly of = of;
}
