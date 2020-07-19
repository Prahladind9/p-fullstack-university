import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  constructor() {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 6, 1);
    this.maxDate = new Date(currentYear + 1, 5, 31);
  }

  ngOnInit(): void {
  }

  /*
    On Selection of month, all days are loaded
    same is when we'll color code
  */

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDay();
    console.log('Day >>' + d.getDay());
    console.log('Month >>' + d.getMonth());
    console.log('Year >>' + d.getFullYear());

    if (date === 6 || date === 0) {
      return 'day-border-class weekend-class';
    } else if (date === 4) {
      return 'day-border-class weekday-holiday-class';
    } else if (date === 3) {
      return 'day-border-class weekday-absent-class';
    } else {
      return 'day-border-class weekday-present-class';
    }
  };

}

/*
ReferredLinks
DatePicker - https://material.angular.io/components/datepicker/overview
*/
