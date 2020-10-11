import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {StudentDetailsModel} from '../../shared/model/studentDetails.model';
import {DiaryModel} from '../../shared/model/diary.model';
import {Router} from '@angular/router';
import {DiaryService} from '../../shared/service/diary.service';
import {StudentDetailsService} from '../../shared/service/student-details.service';
import {AuthService} from '../../shared/service/auth.service';
import {ClassSection} from '../../shared/interface/class-section';
import {MaintenanceService} from '../../shared/service/maintenance.service';

@Component({
  selector: 'app-teacher-diary',
  templateUrl: './teacher-diary.page.html',
  styleUrls: ['./teacher-diary.page.scss'],
})
export class TeacherDiaryPage implements OnInit {

  sections: ClassSection[];

  minDate: Date;
  maxDate: Date;
  diaryDate = new FormControl(new Date());
  // studentStandard = new FormControl(this.sections[0].value);
  studentStandard = new FormControl();

  homework = new FormControl('');
  studentDetailsModel: StudentDetailsModel;
  studentDetailsModelList: Array<StudentDetailsModel>;

  diaryModel: DiaryModel;

  isIndeterminate: boolean;
  masterCheck: boolean;

  logMethod(message: any) {
    console.log(TeacherDiaryPage.name + ' > ' + message);
  }

  constructor(private router: Router,
              private maintenanceService: MaintenanceService,
              private diaryService: DiaryService,
              private studentDetailsService: StudentDetailsService,
              private usersService: AuthService) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    this.logMethod('constructor - (0) - Set Min Max Date for the Calendar ');
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 6, 1);
    this.maxDate = new Date(currentYear + 1, 5, 31);

    this.sections = this.maintenanceService.classSection;
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

    this.logMethod('getStudentsList-(2) call getStudentDetailsByStudentStandardAndStudentSection with ' + this.studentDetailsModel);
    this.studentDetailsService.getStudentDetailsByStudentStandardAndStudentSection(this.studentDetailsModel)
        .subscribe(
            response => {
              this.logMethod('getStudentsList-(3) call response ' + JSON.stringify(response));
              this.studentDetailsModelList = response;
              this.logMethod('getStudentsList-(4) parsed studentDetailsModelList ' + JSON.stringify(this.studentDetailsModelList));
            },
            error => {
              this.logMethod('getStudentDetailsByStudentStandardAndStudentSection - error ' + error);
            }
        );
  }


  saveDiary(){
    this.logMethod('saveDiary');
    this.logMethod('saveDiary-(1)' + ' >' + JSON.stringify(this.homework.value));
    this.logMethod('saveDiary-(2)' + ' > Student Id List > ' + JSON.stringify(this.studentDetailsModelList.map(a => a.studentId)));

    this.logMethod('saveDiary-(3) - build diaryModel');
    this.diaryModel = new DiaryModel(
        this.diaryDate.value,
        // todo check this later
        // this.usersService.getUserDetails().facultyDetailsModel.facultyId,
        // this.usersService.userDetails.userName === 't' ? 1 : 2,
        1 ,
        this.studentStandard.value, 'A', this.homework.value,
        this.studentDetailsModelList.map(student => student.isPresentStatus)
            .filter((value, index, self) => self.indexOf(value) === index)
            .length > 1 ? false : true // Cross check this condition
        , this.studentDetailsModelList.map(a => a.studentId), null
    );

    this.logMethod('saveDiary-(5)- saveDiaryForDiaryDate call with diaryModel ' + JSON.stringify(this.diaryModel));
    this.diaryService.saveDiaryForDiaryDate(this.diaryModel)
        .subscribe(
            response => {
              this.logMethod('saveDiary-(6) response ' + response);
            },
            error => {
              this.logMethod('saveDiaryForDiaryDate error ' + JSON.stringify(error));
            }
        );

    // this.router.navigate([this.usersService.defaultUrl]);

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
      if (obj.isPresentStatus) { checked++; }
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

}
