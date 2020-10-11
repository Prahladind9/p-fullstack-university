import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherZoomPage } from './teacher-zoom.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherZoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherZoomPageRoutingModule {}
