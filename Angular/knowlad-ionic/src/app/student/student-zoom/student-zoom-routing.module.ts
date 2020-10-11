import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentZoomPage } from './student-zoom.page';

const routes: Routes = [
  {
    path: '',
    component: StudentZoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentZoomPageRoutingModule {}
