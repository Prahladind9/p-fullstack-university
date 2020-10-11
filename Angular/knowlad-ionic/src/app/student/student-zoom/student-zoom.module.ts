import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentZoomPageRoutingModule } from './student-zoom-routing.module';

import { StudentZoomPage } from './student-zoom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentZoomPageRoutingModule
  ],
  declarations: [StudentZoomPage]
})
export class StudentZoomPageModule {}
