import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDiaryPageRoutingModule } from './student-diary-routing.module';

import { StudentDiaryPage } from './student-diary.page';
import {StudentDiaryItemComponent} from './student-diary-item/student-diary-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StudentDiaryPageRoutingModule
  ],
    declarations: [StudentDiaryPage, StudentDiaryItemComponent]
})
export class StudentDiaryPageModule {}
