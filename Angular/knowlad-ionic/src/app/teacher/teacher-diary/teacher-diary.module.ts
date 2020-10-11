import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherDiaryPageRoutingModule } from './teacher-diary-routing.module';

import { TeacherDiaryPage } from './teacher-diary.page';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TeacherDiaryPageRoutingModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatCardModule,
        MatListModule
    ],
  declarations: [TeacherDiaryPage]
})
export class TeacherDiaryPageModule {}
