import { Injectable } from '@angular/core';
interface Event {
  id: number;
  date: Date;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public events: Event[] = [];

  constructor() {
    // Initial dummy events
    this.events = [
      { id: 1, date: new Date(), title: 'Sample Event', description: 'This is a sample event' },
      { id: 4, date: new Date(), title: 'Sample Event 4', description: 'This is a sample event 4' },
      { id: 2, date: new Date('2024-06-05'), title: 'Sample Event 2', description: 'This is a sample event 2' },
      { id: 3, date: new Date('2024-06-07'), title: 'Sample Event 3', description: 'This is a sample event 3' },
    ];
  }
  getEvents(): Event[] {
    return this.events;
  }

  getEventsByDate(date: Date): Event[] {
    return this.events.filter(event => event.date.toDateString() === date.toDateString());
  }

  addEvent(event: Event): void {
    this.events.push(event);
  }

  updateEvent(updatedEvent: Event): void {
    const index = this.events.findIndex(event => event.id === updatedEvent.id);
    if (index !== -1) {
      this.events[index] = updatedEvent;
    }
  }

  deleteEvent(eventId: number): void {
    this.events = this.events.filter(event => event.id !== eventId);
  }

}
