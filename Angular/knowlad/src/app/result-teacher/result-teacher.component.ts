import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentResultModel} from '../service/model/studentResult.model';
import {ResultService} from '../service/data/result.service';
import {UsersService} from '../service/data/users.service';
import {resultTable} from '../result/result.component';
import {StudentDetailsModel} from '../service/model/studentDetails.model';
import {StudentDetailsService} from '../service/data/student-details.service';
import {Router} from '@angular/router';

interface ExamType {
  value: string;
  viewValue: string;
}

interface ClassSection {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-result-teacher',
  templateUrl: './result-teacher.component.html',
  styleUrls: ['./result-teacher.component.scss']
})
export class ResultTeacherComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  resultFormGroup: FormGroup;

  studentResult: StudentResultModel;

  sections:  ClassSection[] = [
    {value: '1', viewValue: 'Class & Section (1-A)'},
    {value: '2', viewValue: 'Class & Section (2-A)'},
    {value: '3', viewValue: 'Class & Section (3-A)'}
  ];

  examTypes: ExamType[] = [
    {value: 'U1', viewValue: 'Unit Exam - 1'},
    {value: 'U2', viewValue: 'Unit Exam - 2'},
    {value: 'Q', viewValue: 'Quarterly Exam'},
    {value: 'H', viewValue: 'Half-Yearly Exam'},
    {value: 'F', viewValue: 'Final Exam'}
  ];

  studentStandard = new FormControl(1);
  examTypeControl = new FormControl(this.examTypes[2].value);
  studentControl = new FormControl();

  formHide: boolean = false;

  studentDetailsModel: StudentDetailsModel;
  studentDetailsModelList: Array<StudentDetailsModel>;

  studentResultModel: StudentResultModel;

  logMethod(message: any) {
    console.log(ResultTeacherComponent.name + ' > ' + message);
  }

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private studentDetailsService: StudentDetailsService,
    private resultService: ResultService)
  {
    this.logMethod('constructor ' + this.studentResult);
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      studentClass: [this.studentStandard, Validators.required],
      testType: [this.examTypeControl, Validators.required],
      student: [this.studentControl, Validators.required]
    });
    this.logMethod('ngOnInit (0)' + this.firstFormGroup.value);


    this.resultFormGroup = new FormGroup(
      {
        firstLanguage: new FormControl(0, Validators.required),
        secondLanguage: new FormControl(0, Validators.required),
        thirdLanguage: new FormControl(0, Validators.required),
        maths: new FormControl(0, Validators.required),
        science: new FormControl(0, Validators.required),
        social: new FormControl(0, Validators.required)
      }
    );
    this.logMethod('ngOnInit (1)' + this.resultFormGroup.value);

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

  }

  showResultsFlag(){
    this.formHide = !this.formHide;
  }

  uploadResult(){
    this.logMethod('uploadResult - (1) - ResultFormData ' + JSON.stringify(this.resultFormGroup.value));
    this.logMethod('uploadResult - (2) - build Result Data ');
    this.studentResultModel = new StudentResultModel(
      null,
      this.studentControl.value,
      2020, this.examTypeControl.value,
      this.resultFormGroup.get('firstLanguage').value,
      this.resultFormGroup.get('secondLanguage').value,
      this.resultFormGroup.get('thirdLanguage').value,
      this.resultFormGroup.get('maths').value,
      this.resultFormGroup.get('science').value,
      this.resultFormGroup.get('social').value,
      null, null, null
    );

    this.logMethod('uploadResult -(3)- saveStudentResultForAcademicYearForTestType call with Result Data '
      + JSON.stringify(this.studentResultModel));
    this.resultService.saveStudentResultForAcademicYearForTestType(this.studentResultModel)
      .subscribe(
        response => {
          this.logMethod('uploadResult-(4) response ' + JSON.stringify(response));
        },
        error => {
          this.logMethod('saveStudentResultForAcademicYearForTestType error ' + error);
        }
      );

    this.router.navigate(['Homepage']);
  }

}
