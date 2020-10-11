import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {DiaryModel} from '../../shared/model/diary.model';
import {DiaryService} from '../../shared/service/diary.service';
import {AuthService} from '../../shared/service/auth.service';

@Component({
    selector: 'app-student-diary',
    templateUrl: './student-diary.page.html',
    styleUrls: ['./student-diary.page.scss'],
})
export class StudentDiaryPage implements OnInit {

    minDate: Date;
    maxDate: Date;
    diaryDate = new FormControl(new Date().toISOString());

    diaryModel: DiaryModel;
    homeWork: Array<string>;

    logMethod(message: any) {
        console.log(StudentDiaryPage.name + ' > ' + message);
    }

    constructor(private diaryService: DiaryService,
                private usersService: AuthService) {
        // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
        this.logMethod('constructor - (0) - Set Min Max Date for the Calendar ');
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear - 1, 6, 1);
        this.maxDate = new Date(currentYear + 1, 5, 31);
        this.getDiary();
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

                    this.logMethod('getDiary-(4) homeWork ' + JSON.stringify(this.homeWork));
                },
                error => {
                    this.logMethod('getDiaryForDiaryDateForStudentId error - ' + + JSON.stringify(error));
                }
            );
    }

}
