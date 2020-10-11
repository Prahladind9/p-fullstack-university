import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherPage } from './teacher.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TeacherPage,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () => import('./teacher-home/teacher-home.module')
                .then(m => m.TeacherHomePageModule)
          },
          {
            path: 'teacher-home',
            loadChildren: () => import('./teacher-home/teacher-home.module')
                .then(m => m.TeacherHomePageModule)
          },
          {
            path: 'teacher-diary',
            loadChildren: () => import('./teacher-diary/teacher-diary.module')
                .then(m => m.TeacherDiaryPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/teacher/tabs/teacher-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'teacher-attendance',
        loadChildren: () => import('./teacher-attendance/teacher-attendance.module')
            .then(m => m.TeacherAttendancePageModule)
      },
      {
        path: 'teacher-result',
        loadChildren: () => import('./teacher-result/teacher-result.module')
            .then(m => m.TeacherResultPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/teacher/tabs/teacher-home',
    pathMatch: 'full'
  },
  {
    path: 'teacher-zoom',
    loadChildren: () => import('./teacher-zoom/teacher-zoom.module').then( m => m.TeacherZoomPageModule)
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// @ts-ignore
export class TeacherPageRoutingModule {
}
