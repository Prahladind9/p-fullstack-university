import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherZoomPageRoutingModule } from './teacher-zoom-routing.module';

import { TeacherZoomPage } from './teacher-zoom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherZoomPageRoutingModule
  ],
  declarations: [TeacherZoomPage]
})
export class TeacherZoomPageModule {}
