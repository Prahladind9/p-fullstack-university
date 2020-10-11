import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { IonicModule } from '@ionic/angular';

import { StudentAttendancePageRoutingModule } from './student-attendance-routing.module';

import { StudentAttendancePage } from './student-attendance.page';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StudentAttendancePageRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatNativeDateModule,
        MatDatepickerModule
    ],
    providers: [
        MatNativeDateModule,
        MatDatepickerModule
    ],
  declarations: [StudentAttendancePage]
})
export class StudentAttendancePageModule {}
