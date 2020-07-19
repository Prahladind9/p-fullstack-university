import {Component, OnInit} from '@angular/core';
import {DiaryModel} from '../service/model/diary.model';
import {DiaryService} from '../service/data/diary.service';
import {UsersService} from '../service/data/users.service';
import {StudentDetailsModel} from '../service/model/studentDetails.model';
import {StudentDetailsService} from '../service/data/student-details.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

interface ClassSection {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-diary-teacher',
  templateUrl: './diary-teacher.component.html',
  styleUrls: ['./diary-teacher.component.scss']
})
export class DiaryTeacherComponent implements OnInit {

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

  homework = new FormControl('');
  studentDetailsModel: StudentDetailsModel;
  studentDetailsModelList: Array<StudentDetailsModel>;
  selectedOptions: Array<StudentDetailsModel>;

  isForAllStudents: boolean;
  studentIdList: Array<number>;
  diaryModel: DiaryModel;


  logMethod(message: any) {
    console.log(DiaryTeacherComponent.name + ' > ' + message);
  }

  constructor(private router: Router,
              private diaryService: DiaryService,
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


  saveDiary(){
    this.logMethod('saveDiary');
    this.logMethod('saveDiary-(1)' + JSON.stringify(this.selectedOptions) + ' ' + this.homework.value);
    this.isForAllStudents = this.selectedOptions.length === this.studentDetailsModelList.length;
    this.logMethod('saveDiary-(2) isForAllStudents ' + this.isForAllStudents);
    if(this.isForAllStudents){
      this.logMethod('saveDiary-(3) - isForAllStudents(True) - No need to parse studentIdList');
    }else{
      this.studentIdList = this.selectedOptions.map(x => x.studentId);
      this.logMethod('saveDiary-(3) parsed studentIdList ' + this.studentIdList);
    }

    this.logMethod('saveDiary-(4) - build diaryModel');
    this.diaryModel = new DiaryModel(
      this.diaryDate.value,
      //todo check this later
      // this.usersService.getUserDetails().facultyDetailsModel.facultyId,
      this.usersService.loggedInUser.userName === 't' ? 1 : 2,
      this.studentStandard.value, 'A', this.homework.value,
      this.isForAllStudents, this.studentIdList, null
    );

    this.logMethod('saveDiary-(5)- saveDiaryForDiaryDate call with diaryModel '+ JSON.stringify(this.diaryModel));
    this.diaryService.saveDiaryForDiaryDate(this.diaryModel)
      .subscribe(
        response => {
          this.logMethod('saveDiary-(6) response ' + response);
        },
        error => {
          this.logMethod('saveDiaryForDiaryDate error ' + JSON.stringify(error));
        }
      );

    this.router.navigate(['Homepage']);

  }

}
