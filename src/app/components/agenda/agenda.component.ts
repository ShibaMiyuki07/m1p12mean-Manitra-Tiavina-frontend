import {Component, ChangeDetectionStrategy, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import { isSameDay, isSameMonth} from 'date-fns';
import {of, Subject} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarModule, CalendarView,} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {DatePipe, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {AppModules} from "../../app.modules";
import {ApiReservationServiceService} from "../../services/reservationApi/api-reservation-service.service";
import {AuthService} from "../../services/auth.service";
import {Constant} from "../../models/Constant";
import {UnassignedReservation} from "../../models/apiResult/unassignedReservation";
import {ReservationDetailsUser} from "../../models/apiResult/ReservationDetailsUser";

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
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl : "./agenda.component.css",
  templateUrl: 'agenda.component.html',
  imports: [
    CalendarModule,
    NgSwitch,
    AppModules,
    NgSwitchCase,
    NgIf,
    DatePipe
  ],
  standalone: true
})
export class AgendaComponent implements OnInit {

  isLoading : boolean = false;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  private readonly  reservationService = inject(ApiReservationServiceService);
  private readonly authService : AuthService = inject(AuthService);
  mechanicId = this.authService.getUserId();
  protected readonly Constant = new Constant();
  cdr : ChangeDetectorRef = inject(ChangeDetectorRef);

  action : Record<string, CalendarEventAction[]> = {
    "pending" : [{
      label: '<i class="fa-solid fa-check"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('pending', event);
      },
    }],
    "not started" : [
      {
        label: "<i class='fas fa-spinner fa-spin'></i>",
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('not started', event);
        },
      }
    ]
  }

  events: CalendarEvent[] = [];
  isOpen : boolean = false;
  reservationDetails : ReservationDetailsUser[] = [];


  ngOnInit(): void {
    this.reservationService.getReservationsByMechanicId(this.mechanicId).subscribe(liste =>{
      for(let reservation of liste){
        this.events.push(
          {
            id : reservation._id,
            start: new Date(reservation.reservationDate),
            end: new Date(reservation.endReservation),
            title: `${reservation.result.name} - ${reservation.user.profile.firstName} ${reservation.user.profile.lastName} (${reservation.user.profile.phone})` ,
            color: { ...colors[reservation.status] },
            actions: this.action[reservation.status]
          }
        );
      }
    });
  }
  refresh = new Subject<void>();



  activeDayIsOpen: boolean = true;


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

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  onClick(event: CalendarEvent)
  {
    this.isLoading = true;
    this.reservationService.getReservationById(event.id).subscribe(reservation => {
      this.reservationDetails = reservation;
      this.isOpen = true;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {

      this.reservationService.getReservationById(event.id).subscribe(reservation => {
        this.reservationDetails = reservation;
        if(reservation.length !== 0)
        {
          if(action === this.Constant.Status.pending)
          {
            this.reservationDetails[0].status = this.Constant.Status.finished;
          }
          else if(action === this.Constant.Status.notStarted)
          {
            this.reservationDetails[0].status = this.Constant.Status.pending;
          }
          this.reservationService.updateReservationById(this.reservationDetails[0],this.reservationDetails[0].status);
          location.reload();
        }
      });

  }

  closeModal(): void {
    this.isOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  protected readonly of = of;
}
