import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentResultModel} from '../../shared/model/studentResult.model';
import {ResultService} from '../../shared/service/result.service';
import {AuthService} from '../../shared/service/auth.service';

export interface resultTable {
  subject: string;
  marks: number;
}

interface Year {
  value: string;
  viewValue: string;
}

interface ExamType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.page.html',
  styleUrls: ['./student-result.page.scss'],
})
export class StudentResultPage implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;

  showResults = false;
  displayedColumns: string[] = ['subject', 'marks'];
  studentResult: StudentResultModel;
  results: resultTable[];

  academicYears: Year[] = [
    {value: '2020', viewValue: '2020'}
  ];

  examTypes: ExamType[] = [
    {value: 'U1', viewValue: 'Unit - 1'},
    {value: 'U2', viewValue: 'Unit - 2'},
    {value: 'Q', viewValue: 'Quarterly'},
    {value: 'H', viewValue: 'Half-year'},
    {value: 'F', viewValue: 'Annual'}
  ];

  academicYearControl = new FormControl(this.academicYears[0].value);
  examTypeControl = new FormControl(this.examTypes[2].value);

  logMethod(message: any) {
    console.log(StudentResultPage.name + ' > ' + message);
  }

  constructor(
      private _formBuilder: FormBuilder,
      private resultService: ResultService,
      private usersService: AuthService) {
    this.logMethod('constructor ' + this.studentResult);
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      academicYear: [this.academicYearControl, Validators.required],
      testType: [this.examTypeControl, Validators.required]
    });
    this.logMethod('ngOnInit ' + this.studentResult);
  }


  fetchResults() {
    this.logMethod('fetchResults - (0)');

    this.studentResult =
        new StudentResultModel(null,
            // this.usersService.getUserDetails().userId,
            1,
            this.academicYearControl.value,
            this.examTypeControl.value,
            null, null, null, null, null, null, null, null, false);

    this.logMethod('fetchResults - (1) getResultForStudent Api call with Student Details ' + JSON.stringify(this.studentResult));
    this.resultService.getStudentResultForAcademicYearForTestType(this.studentResult)
        .subscribe(
            response => {
              this.logMethod('fetchResults - (2) get getResultForStudent Success - ' +  JSON.stringify(response));
              this.studentResult = response;

              this.logMethod('fetchResults - (3) Parse Results to display');
              this.results = [
                {subject: 'Telugu', marks: this.studentResult.firstLanguage},
                {subject: 'Hindi', marks: this.studentResult.secondLanguage},
                {subject: 'English', marks: this.studentResult.thirdLanguage},
                {subject: 'Maths', marks: this.studentResult.maths},
                {subject: 'Science', marks: this.studentResult.science},
                {subject: 'Social', marks: this.studentResult.social}
              ];
              this.logMethod('fetchResults - (4) Parsed Results to display - ' + JSON.stringify(this.results));
            },
            error => {
              this.logMethod('fetchResults error ' + + JSON.stringify(error));
            }
        );
  }


  showResultsFlag() {
    this.logMethod('showResultsFlag before ' + this.showResults);
    this.showResults = !this.showResults;
    this.logMethod('showResultsFlag after ' + this.showResults);
  }


}
