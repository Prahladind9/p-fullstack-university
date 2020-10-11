import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherResultPage } from './teacher-result.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherResultPageRoutingModule {}
