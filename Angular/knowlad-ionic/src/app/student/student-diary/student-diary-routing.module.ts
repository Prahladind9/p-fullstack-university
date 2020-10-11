import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDiaryPage } from './student-diary.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDiaryPageRoutingModule {}
