import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherResultPageRoutingModule } from './teacher-result-routing.module';

import { TeacherResultPage } from './teacher-result.page';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TeacherResultPageRoutingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatStepperModule,
        MatSelectModule
    ],
  declarations: [TeacherResultPage]
})
export class TeacherResultPageModule {}
