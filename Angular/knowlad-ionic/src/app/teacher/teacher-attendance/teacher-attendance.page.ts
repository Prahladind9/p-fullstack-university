import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StudentDetailsModel} from '../../shared/model/studentDetails.model';
import {AttendanceModel} from '../../shared/model/attendance.model';
import {Router} from '@angular/router';
import {AttendanceService} from '../../shared/service/attendance.service';
import {StudentDetailsService} from '../../shared/service/student-details.service';
import {AuthService} from '../../shared/service/auth.service';
import {AlertController} from '@ionic/angular';
import {AlertService} from '../../shared/service/alert.service';
import {ClassSection} from '../../shared/interface/class-section';
import {MaintenanceService} from '../../shared/service/maintenance.service';

@Component({
    selector: 'app-teacher-attendance',
    templateUrl: './teacher-attendance.page.html',
    styleUrls: ['./teacher-attendance.page.scss'],
})
export class TeacherAttendancePage implements OnInit {

    constructor(private router: Router,
                private alertController: AlertController,
                private alertService: AlertService,
                private maintenanceService: MaintenanceService,
                private attendanceService: AttendanceService,
                private studentDetailsService: StudentDetailsService,
                private usersService: AuthService) {
        // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
        this.logMethod('constructor - (0) - Set Min Max Date for the Calendar', null);
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 1, 6, 1);
        this.maxDate = new Date(currentYear + 1, 5, 31);

        this.sections = this.maintenanceService.classSection;
    }

    minDate: Date;
    maxDate: Date;
    sections: ClassSection[];

    cardHide = false;

    attendanceDate = new FormControl(new Date());
    studentStandard = new FormControl();

    studentDetailsModel: StudentDetailsModel;
    studentDetailsModelList: Array<StudentDetailsModel>;
    selectedOptions: Array<StudentDetailsModel>;

    attendanceForStudents: Array<AttendanceModel>;

    isIndeterminate: boolean;
    masterCheck: boolean;

    logMethod(message: any, value: any) {
        console.log(TeacherAttendancePage.name + ' > ' + message + ' > ' + JSON.stringify(value));
    }

    ngOnInit(): void {
    }

    getStudentsList() {
        this.logMethod('getStudentsList-(0)', this.attendanceDate.value);
        this.logMethod('getStudentsList-(1) build studentDetailsModel for Section', this.studentStandard.value);
        this.studentDetailsModel = new StudentDetailsModel(
            null, null, null, null, null,
            this.studentStandard.value, 'A', true
        );

        this.logMethod('getStudentsList-(2) call getStudentDetailsByStudentStandardAndStudentSection with', this.studentDetailsModel);
        this.studentDetailsService.getStudentDetailsByStudentStandardAndStudentSection(this.studentDetailsModel)
            .subscribe(
                response => {
                    this.logMethod('getStudentsList-(3) call response ', response);
                    this.studentDetailsModelList = response;
                    this.logMethod('getStudentsList-(4) parsed studentDetailsModelList', this.studentDetailsModelList);
                },
                error => {
                    this.logMethod('getStudentDetailsByStudentStandardAndStudentSection - error', error);
                }
            );
        this.cardHide = !this.cardHide;
    }

    saveAttendance() {
        // todo need to cross check the logic and modify implementation accordingly
        // todo Date is coming one day back
        this.logMethod('saveAttendance', null);
        this.logMethod('saveAttendance-(1)', this.selectedOptions);

        this.logMethod('saveAttendance-(2) build attendanceForStudents', null);
        this.attendanceForStudents = new Array<AttendanceModel>();
        for (const student of this.studentDetailsModelList) {
            this.attendanceForStudents.push(
                new AttendanceModel
                (null, 1, student.studentId,
                    2020,
                    this.attendanceDate.value, student.isPresentStatus ? 'P' : 'A')
            );
        }

        this.logMethod('saveAttendance-(3) call saveAttendanceForStudents API with attendanceForStudents'
            , this.attendanceForStudents);
        this.attendanceService.saveAttendanceForStudents(this.attendanceForStudents)
            .subscribe(
                response => {
                  this.logMethod('saveAttendance-(4) response', response);
                },
                error => {
                  this.logMethod('saveAttendanceForStudents error', error);
                }
            );

        this.router.navigate([this.usersService.defaultUrl]);

    }


    checkMaster($event: MouseEvent) {
        setTimeout(() => {
            this.studentDetailsModelList.forEach(obj => {
                obj.isPresentStatus = this.masterCheck;
            });
        });
    }

    checkEvent() {
        const totalItems = this.studentDetailsModelList.length;
        let checked = 0;
        this.studentDetailsModelList.map(obj => {
            if (obj.isPresentStatus) {
                checked++;
            }
        });
        if (checked > 0 && checked < totalItems) {
            // If even one item is checked but not all
            this.isIndeterminate = true;
            this.masterCheck = false;
        } else if (checked === totalItems) {
            // If all are checked
            this.masterCheck = true;
            this.isIndeterminate = false;
        } else {
            // If none is checked
            this.isIndeterminate = false;
            this.masterCheck = false;
        }
    }

    getStudentsListAlert() {
        this.alertService.
        presentConfirm('Selection Confirmation?', 'Confirm for the selection', 'No', 'Yes').then(res => {
            if (res === 'Yes') {
                this.getStudentsList();
            }
        });
    }


    saveAttendanceAlert() {
        this.alertService.
        presentConfirm('Selection Confirmation?', 'Confirm for the selection', 'No', 'Yes').then(res => {
            if (res === 'Yes') {
                this.saveAttendance();
            }
        });
    }
}
