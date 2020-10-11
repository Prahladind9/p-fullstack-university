import {Component, Input, OnInit} from '@angular/core';
import {DiaryModel} from '../../../shared/model/diary.model';

@Component({
    selector: 'app-student-diary-item',
    templateUrl: './student-diary-item.component.html',
    styleUrls: ['./student-diary-item.component.scss'],
})
export class StudentDiaryItemComponent implements OnInit {
    @Input() diary: DiaryModel;

    constructor() {
        console.log(StudentDiaryItemComponent.name + ' constructor > ' + JSON.stringify(this.diary));
    }

    ngOnInit() {
        console.log(StudentDiaryItemComponent.name + ' ngOnInit > ' + JSON.stringify(this.diary));
    }

}
