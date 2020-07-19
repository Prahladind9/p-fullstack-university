import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StudentDetailsModel} from '../service/model/studentDetails.model';
import {Router} from '@angular/router';
import {DiaryService} from '../service/data/diary.service';
import {StudentDetailsService} from '../service/data/student-details.service';
import {UsersService} from '../service/data/users.service';
import {AttendanceService} from '../service/data/attendance.service';
import {AttendanceModel} from '../service/model/attendance.model';

interface ClassSection {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-attendance-teacher',
  templateUrl: './attendance-teacher.component.html',
  styleUrls: ['./attendance-teacher.component.scss']
})
export class AttendanceTeacherComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  diaryDate = new FormControl(new Date());
  studentStandard = new FormControl(1);

  sections:  ClassSection[] = [
    {value: '1', viewValue: 'Class & Section (1-A)'},
    {value: '2', viewValue: 'Class & Section (2-A)'},
    {value: '3', viewValue: 'Class & Section (3-A)'}
  ];

  cardHide: boolean = false;

  studentDetailsModel: StudentDetailsModel;
  studentDetailsModelList: Array<StudentDetailsModel>;
  selectedOptions: Array<StudentDetailsModel>;

  attendanceForStudents: Array<AttendanceModel>;

  logMethod(message: any) {
    console.log(AttendanceTeacherComponent.name + ' > ' + message);
  }

  constructor(private router: Router,
              private attendanceService: AttendanceService,
              private studentDetailsService: StudentDetailsService,
              private usersService: UsersService) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    this.logMethod('constructor - (0) - Set Min Max Date for the Calendar ');
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 6, 1);
    this.maxDate = new Date(currentYear + 1, 5, 31);
  }

  ngOnInit(): void {
  }

  getStudentsList(){
    this.logMethod('getStudentsList-(0)');
    this.logMethod('getStudentsList-(1) build studentDetailsModel for Section ' + this.studentStandard.value);
    this.studentDetailsModel = new StudentDetailsModel(
      null, null, null, null, null,
      this.studentStandard.value, 'A'
    );

    this.logMethod('getStudentsList-(2) call getStudentDetailsByStudentStandardAndStudentSection with '+ this.studentDetailsModel);
    this.studentDetailsService.getStudentDetailsByStudentStandardAndStudentSection(this.studentDetailsModel)
      .subscribe(
        response => {
          this.logMethod('getStudentsList-(3) call response '+ JSON.stringify(response));
          this.studentDetailsModelList = response;
          this.logMethod('getStudentsList-(4) parsed studentDetailsModelList '+ JSON.stringify(this.studentDetailsModelList));
        },
        error => {
          this.logMethod('getStudentDetailsByStudentStandardAndStudentSection - error ' + error);
        }
      );
    this.cardHide = !this.cardHide;
  }

  saveAttendance(){
    //todo need to cross check the logic and modify implementation accordingly
    //todo Date is coming one day back
    this.logMethod('saveAttendance');
    this.logMethod('saveAttendance-(1)' + JSON.stringify(this.selectedOptions));

    this.logMethod('saveAttendance-(2) build attendanceForStudents');
    this.attendanceForStudents = new Array<AttendanceModel>();
    for(let student of this.studentDetailsModelList){
      this.attendanceForStudents.push(
        new AttendanceModel
        (null, 1, student.studentId,
          2020, null, null,
          this.diaryDate.value, 'P')
      );
    }

    this.logMethod('saveAttendance-(3) call saveAttendanceForStudents API with attendanceForStudents ' + JSON.stringify(this.attendanceForStudents));
    this.attendanceService.saveAttendanceForStudents(this.attendanceForStudents)
      .subscribe(
        response => {
          this.logMethod('saveAttendance-(4) response ' + JSON.stringify(response));
        },
        error => {
          this.logMethod('saveAttendanceForStudents error ' + error);
        }
      );

    this.router.navigate(['Homepage']);

  }

}
