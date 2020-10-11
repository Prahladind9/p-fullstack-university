import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherDiaryPage } from './teacher-diary.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherDiaryPageRoutingModule {}
