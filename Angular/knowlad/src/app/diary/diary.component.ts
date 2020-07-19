import {Component, OnInit} from '@angular/core';
import {DiaryService} from '../service/data/diary.service';
import {DiaryModel} from '../service/model/diary.model';
import {UsersService} from '../service/data/users.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  diaryDate = new FormControl(new Date());

  diaryModel: DiaryModel;
  homeWork: Array<string>;

  logMethod(message: any) {
    console.log(DiaryComponent.name + ' > ' + message);
  }

  constructor(private diaryService: DiaryService,
              private usersService: UsersService) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    this.logMethod('constructor - (0) - Set Min Max Date for the Calendar ');
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 6, 1);
    this.maxDate = new Date(currentYear + 1, 5, 31);
  }

  ngOnInit(): void {
  }

  getDiary() {
    this.logMethod('getDiary-(0)');
    this.logMethod('getDiary-(1) build diaryModel for diaryDate ' + this.diaryDate.value);
    this.diaryModel = new DiaryModel(new Date(this.diaryDate.value), null, null, null, null, null, null,
      1);
    // this.usersService.getUserDetails().userId);
    this.logMethod('getDiary-(2) getDiaryForDiaryDateForStudentId call with diaryModel ' + this.diaryModel);
    this.diaryService.getDiaryForDiaryDateForStudentId(this.diaryModel)
      .subscribe(
        response => {
          this.logMethod('getDiary-(3) response ' + JSON.stringify(response));
          this.homeWork = response;

          this.logMethod('getDiary-(4) homeWork ' + this.homeWork);
        },
        error => {
          this.logMethod('getDiaryForDiaryDateForStudentId error - ' + error);
        }
      );
  }
}
