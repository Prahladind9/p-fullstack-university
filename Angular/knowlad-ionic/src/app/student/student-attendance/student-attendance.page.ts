import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';

import {AttendanceModel} from '../../shared/model/attendance.model';
import {AttendanceService} from '../../shared/service/attendance.service';

@Component({
    selector: 'app-student-attendance',
    templateUrl: './student-attendance.page.html',
    styleUrls: ['./student-attendance.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StudentAttendancePage implements OnInit {

    minDate: Date;
    maxDate: Date;
    attendanceVal: AttendanceModel;
    attendanceList: AttendanceModel[];
    attendanceData: Array<AttendanceModel>;
    attendanceStatus: string;

    logMethod(message: any) {
        console.log(StudentAttendancePage.name + ' > ' + message);
    }

    constructor(
        // private usersService: AuthService,
        private attendanceService: AttendanceService) {
        // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
        this.logMethod('constructor - (0) - Set Min Max Date for the Calendar ');
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 1, 6, 1);
        this.maxDate = new Date(currentYear + 1, 5, 31);

        this.logMethod('constructor - (1) - build attendanceVal');
        // @ts-ignore
        this.attendanceVal =
            new AttendanceModel(null, null,
                // this.usersService.getUserDetails().userId,        2020,
                1, 2020,
                null, null);

        this.logMethod('constructor - (2) - getAttendanceForStudentForAcademicYear Call with attendanceVal '
            + JSON.stringify(this.attendanceVal));

        this.attendanceService.getAttendanceForStudentForAcademicYear(this.attendanceVal)
            .subscribe(
                response => {
                    this.logMethod('constructor - (3) - Response ' + JSON.stringify(response));
                    this.attendanceData = response;
                    this.logMethod('constructor - (4) - attendanceData ' + JSON.stringify(this.attendanceData));

                    this.attendanceList =
                        this.attendanceData.filter(attendance => attendance.attendanceDate + '' === '2020-07-17'
                        );

                    this.logMethod('dateClass >>> - attendanceList A - ' + JSON.stringify(this.attendanceList));

                },
                error => {
                    this.logMethod('constructor -  attendanceService - error ' + JSON.stringify(error));
                }
            );
    }

    ngOnInit() {
    }

    /*
      On Selection of month, all days are loaded
      same is when we'll color code
    */

    dateClass = (d: Date): MatCalendarCellCssClasses => {
        this.attendanceList =
            this.attendanceData.filter(attendance => attendance.attendanceDate + '' === d.toISOString().slice(0, 10).toString()
            );

        this.logMethod('dateClass >>> - attendanceList A - ' + d.toISOString().slice(0, 10) + ' - ' + JSON.stringify(this.attendanceList));
        this.attendanceStatus = this.attendanceList.length > 0 ? this.attendanceList[0].attendanceStatus : 'A';

        this.logMethod('dateClass - attendanceStatus - ' + this.attendanceStatus);
        if (d.getDay() === 0 || this.attendanceStatus === 'H') {
            return 'day-border-class holiday-class';
        } else if (this.attendanceStatus === 'A') {
            return 'day-border-class weekday-absent-class';
        } else if (this.attendanceStatus === 'P') {
            return 'day-border-class weekday-present-class';
        } else {
            return 'day-border-class unkown-class';
        }

    }

}

/*
ReferredLinks
DatePicker - https://material.angular.io/components/datepicker/overview
*/
