// noinspection SpellCheckingInspection

import {Component, OnInit} from '@angular/core';
import {PageLayoutComponent} from "@layouts/page-layout/page-layout.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ProgressBarComponent} from "@blocks/progress-bar/progress-bar.component";
import {StoreService} from "@services/store.service";
import {TranslateModule} from "@ngx-translate/core";
import {CustomModalComponent} from "@modals/custom-modal/custom-modal.component";
import {MatDialog} from "@angular/material/dialog";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths } from 'date-fns';
import {EventService} from "../../../services/event-service/event.service";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";



// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
@Component({
  selector: 'app-appoinment',
  standalone  : true,
  imports: [PageLayoutComponent, NgIf, ProgressBarComponent, TranslateModule, DatePipe, NgForOf, CdkDrag, MatIcon, CdkDropList, CdkDropListGroup],
  templateUrl: './appoinment.component.html',
  styleUrl: './appoinment.component.scss'
})
export class AppoinmentComponent implements OnInit {
  viewDate: Date = new Date();
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInMonth: any[] = [];
  selectedEvent: any = null;
  constructor
  (
    public storeService : StoreService,
    private _dialog: MatDialog,
    private eventService: EventService
  )
  { }
  public ngOnInit() : void
  {
    setTimeout(_ =>
    {
      this.storeService.isLoading.set(false);
    }, 2000);
    this.loadMonth();
  }

  addAppointment(data?: any){
    this._dialog.open(CustomModalComponent, {
      data: {
        component: 'Appointment',
        data: data
      },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
      .afterClosed().subscribe({
      next: (value: any) => {
        if (value){
          if (value.id){
            this.eventService.updateEvent(value);
          } else {
            value.id = Math.random();
            this.eventService.addEvent(value);
          }
          this.loadMonth();
        }
      }
    })
  }
  loadMonth(): void {
    const start = startOfWeek(startOfMonth(this.viewDate));
    const end = endOfWeek(endOfMonth(this.viewDate));
    let date = start;
    this.daysInMonth = [];
    while (date <= end) {
      this.daysInMonth.push({
        date: date,
        events: this.eventService.getEventsByDate(date)
      });
      date = addDays(date, 1);
    }
  }

  prevMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.loadMonth();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.loadMonth();
  }

  selectDay(day: any): void {
    this.selectedEvent = { id: day?.id,date: day?.date, title: day?.title, description: day?.description };
    console.log(this.selectedEvent,'<<<')
    this.addAppointment(this.selectedEvent);
  }

  editEvent(event: any): void {
    this.selectedEvent = { ...event };
  }

  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId);
    this.loadMonth();
  }
  drop(event: CdkDragDrop<any[]>, day: any): void {
    console.log(event, '<<<')
    const draggedEvent = event.item.data;

    draggedEvent.date = day.date;

    this.eventService.updateEvent(draggedEvent);

    this.loadMonth();

  }
}
