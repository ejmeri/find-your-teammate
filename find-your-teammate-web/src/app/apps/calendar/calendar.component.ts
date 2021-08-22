import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Calendar } from './calendar.model';
import { MatRadioChange } from '@angular/material/radio';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from './calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar' )
  calendar: FullCalendarComponent;

  formCalendar: Calendar = null;

  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData: any;

  public filters = [
    { name: 'all', value: 'All', checked: 'true' },
    { name: 'work', value: 'Work', checked: 'false' },
    { name: 'personal', value: 'Personal', checked: 'false' },
    { name: 'important', value: 'Important', checked: 'false' },
    { name: 'travel', value: 'Travel', checked: 'false' },
    { name: 'friends', value: 'Friends', checked: 'false' },
  ];

  height: number = 300;
  buttonText: any = {
    today:    'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    list: 'Listagem',
  };

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
  calendarWeekends = true;
  @ViewChild('callAPIDialog', { static: false }) callAPIDialog: TemplateRef<any>;
  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  todaysEvents: EventInput[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar
  ) {
    this.dialogTitle = 'Add New Event';
    this.formCalendar = new Calendar({});
    this.addCusForm = this.createContactForm(this.formCalendar);
  }

  public ngOnInit(): void {
    this.calendarEvents = this.events();
    this.tempEvents = this.calendarEvents;
    // you can also get events from json file using following code
    // this.calendarService.getAllCalendars().subscribe((data: Calendar[]) => {
    //   this.calendarEvents = data;
    // })
  }

  createContactForm(formCalendar): FormGroup {
    return this.fb.group({
      id: [formCalendar.id],
      title: [formCalendar.title, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      category: [formCalendar.category],
      startDate: [formCalendar.startDate, [Validators.required]],
      endDate: [formCalendar.endDate, [Validators.required]],
      details: [formCalendar.details, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
    });
  }

  addNewEvent(date: any) {
    console.log(date);
    console.log(this.calendarData);
    
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents = this.calendarEvents.concat({
          // add new event data. must create new array
          id: this.calendarData.id,
          title: this.calendarData.title,
          start: this.calendarData.startDate,
          end: this.calendarData.endDate,
          className: this.calendarData.category,
          groupId: this.calendarData.category,
          details: this.calendarData.details,
        });
        this.addCusForm.reset();
        this.showNotification('snackbar-success', 'Add Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }
  eventClick(row) {
    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      category: row.event.groupId,
      startDate: row.event.start,
      endDate: row.event.end,
      details: row.event.extendedProps.details,
    };

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        action: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents.forEach(function (element, index) {
          if (this.calendarData.id === element.id) {
            this.editEvent(index, this.calendarData);
          }
        }, this);
        this.showNotification('black', 'Edit Record Successfully...!!!', 'bottom', 'center');
        this.addCusForm.reset();
      } else if (result === 'delete') {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents.forEach(function (element, index) {
          if (this.calendarData.id === element.id) {
            this.filterEvent(element);
          }
        }, this);
        this.showNotification('snackbar-danger', 'Delete Record Successfully...!!!', 'bottom', 'center');
      }
    });
  }
  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent.details = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
  }
  handleEventRender(info) {
    // console.log(info)
    // info.el.innerHTML += `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yNDc4eXi5urw8vTO1dvp7O/GztXT2t/s7/Hn6+7I0NbM09nQ19za3+QGzVyfAAAFAElEQVR4nO2c3ZarIAxGLWrrX+37v+1RbE+1QSUYJK759sWsNReH2n1ICBEmu4FfstQPoBA4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETyuWcGHPrnn1d1/29G34xET7iUk7M7fkqmuxL2eZ9Je7lOk7MrS/KzEGTP2W1XMWJ6XKnkPd8GbTIfdY1nJiuWBcy8ahvUlqu4MRUu0YseSVj5QpOci8jI0UnYUW9E3Nv9l3MrAjMFfVO/CfJJ4IOf6RuJ6ZjTZKJsj44VVQ7MTXfyEh7LK1odmLYcfOfQwGk2UkbrGQobg8UcXqdVAGpZM4rWIpaJ0eVDJVt6LKs1Um3sbvxpg+TotSJiJIh1QZJ0emkEzGSjfET8OkqnQjNkpEyYP1R6UROyQC/qtXo5PCKs4SdVBQ6ecgqGfbKTCmiTmxb9GBv1Pj1j1g8eI8g6MQ887bMykcRWBZMg4TvcTZoWMuPmBPTfbcnTfBu3fQxlAzLT8d4CCkn5rV4hiJwmGccJQOMNVnIyY+SLGvDxhFdhZfcvaXIOHE0f7jJ3g4jvuQESZFxUjkeoWePEie/8qWIOHGunw13osTKr2wpMvPE/QTMQcQ2fkeliDhx/wdzM4pwSR8uRcLJSh54sJzEqF8d+CzJIk7cX6dkOYmeTPylRHTCGtq1csVhv6JVMk/iViZLdvc+OvIJKYNjUu5JEVl37s7PZvRyTliGZzQ7T6OjPjljGZ6xM4Nl6lhX8PiHTuyanrJdOgntix37Wf9p4g69qGzGtZAT+rUY2SRig2CVra6XVP/kt1ngX9ifVMD+stEgFeuzLWcKY5YkiBzLeu0m16OeHdhsOS/fUkTOSLn6RJJ9+6ouHk1TvDgnpxJFzsjqGw7Zd17GwvkXqSJnZC3npX4PmCpyLCtHmdI6SRg5FneLKa2TlJFjcW4H0zpJGjkjzu1gSiepI2fElWfdTj6LB3cV4XFWu3ETR56lTsxQZ+RtY6d18yhed/kLd2+SR46F7lV/nZjqRZoZTX4Xu0M1+yQFkWMheXbpZPWOWVlIXrizJF9zPpB6dulkqy3avGQny8m9tQ1+N6xzJ9VO87yUunB3UxQ5Iz99g68T43MeRsyKmsixLFPKfye+b/VzmQjSseZ8WKaUjxP/K1WHr5bdlEXOyCKlZFwl2bH7QhMqqrUF85QyOeEehwk9wvdBV+RYZillcsI+blj6n5ijqIuckfb7hayTkJf64VMl9DZoZL4pxToJKp+Cp8q5L4f9ec6cmND7mWG3qM48VsHifyM/O/K2NuQW4vkvh7359FKyYycw+dcNdBWwS97fJjt4aIodPwqX4S/TgpwdjW7ewXq1yWRiWpCPj1MyXvspTiYTdt8iMZB3UlFamcyphJx4J5V4t3PEGE9XyYzkV9RWqvPrm5cRcuJ3C1F3fv3QSTnxyLTB5fLJNEZurJ3tj8rNsBPJ88ub/bfrKJFlY/n5q0q2DjteJJfEYKXQP/53gK6M6xK8uV+hLokJ7en/2VTyZXGgw9zqvz5JLE3//nsfw8/6T2eSBW1e9/c6v0YxDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASfkHNShrMX8vZs0AAAAASUVORK5CYII=">`;
    // this.todaysEvents = this.todaysEvents.concat(info);
  }
  changeCategory(e: MatRadioChange) {
    this.filterOptions = e.value;
    this.calendarEvents = this.tempEvents;
    this.calendarEvents.forEach(function (element, index) {
      if (this.filterOptions !== 'all' && this.filterOptions.toLowerCase() !== element.groupId) {
        this.filterEvent(element);
      }
    }, this);
  }
  filterEvent(element) {
    this.calendarEvents = this.calendarEvents.filter((item) => item !== element);
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {}
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  public randomIDGenerate(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  getClassNameValue(category) {
    let className: string;

    if (category === 'work') className = 'fc-event-success';
    else if (category === 'personal') className = 'fc-event-warning';
    else if (category === 'important') className = 'fc-event-primary';
    else if (category === 'travel') className = 'fc-event-danger';
    else if (category === 'friends') className = 'fc-event-info';

    return className;
  }
  events() {
    return [
      {
        title: `Silva`,
        allDay: true,
        className: 'fc-event',
        start: new Date(year, month, 3, 0, 0),
      },

      {
        id: 'event1',
        title: 'All Day Event',
        start: new Date(year, month, 1, 0, 0),
        end: new Date(year, month, 1, 23, 59),
        className: 'fc-event-success',
        groupId: 'work',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.',
      },
      {
        id: 'event2',
        title: 'Break',
        start: new Date(year, month, day + 28, 16, 0),
        end: new Date(year, month, day + 29, 20, 0),
        allDay: false,
        className: 'fc-event-primary',
        groupId: 'important',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. ',
      },
      {
        id: 'event3',
        title: 'Shopping',
        start: new Date(year, month, day + 4, 12, 0),
        end: new Date(year, month, day + 4, 20, 0),
        allDay: false,
        className: 'fc-event-warning',
        groupId: 'personal',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. ',
      },
      {
        id: 'event4',
        title: 'Meeting',
        start: new Date(year, month, day + 14, 10, 30),
        end: new Date(year, month, day + 16, 20, 0),
        allDay: false,
        className: 'fc-event-success',
        groupId: 'work',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.',
      },
      {
        id: 'event5',
        title: 'Lunch',
        start: new Date(year, month, day, 11, 0),
        end: new Date(year, month, day, 14, 0),
        allDay: false,
        className: 'fc-event-primary',
        groupId: 'important',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.',
      },
      {
        id: 'event6',
        title: 'Meeting',
        start: new Date(year, month, day + 2, 12, 30),
        end: new Date(year, month, day + 2, 14, 30),
        allDay: false,
        className: 'fc-event-success',
        groupId: 'work',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.',
      },
      {
        id: 'event7',
        title: 'Birthday Party',
        start: new Date(year, month, day + 17, 19, 0),
        end: new Date(year, month, day + 17, 19, 30),
        allDay: false,
        className: 'fc-event-warning',
        groupId: 'personal',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.',
      },
      {
        id: 'event8',
        title: 'Go to Delhi',
        start: new Date(year, month, day + -5, 10, 0),
        end: new Date(year, month, day + -4, 10, 30),
        allDay: false,
        className: 'fc-event-danger',
        groupId: 'travel',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.',
      },
      {
        id: 'event9',
        title: 'Get To Gather',
        start: new Date(year, month, day + 6, 10, 0),
        end: new Date(year, month, day + 7, 10, 30),
        allDay: false,
        className: 'fc-event-info',
        groupId: 'friends',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.',
      },
      {
        id: 'event10',
        title: 'Collage Party',
        start: new Date(year, month, day + 20, 10, 0),
        end: new Date(year, month, day + 20, 10, 30),
        allDay: false,
        className: 'fc-event-info',
        groupId: 'friends',
        details: 'Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.',
      },
    ];
  }
}
