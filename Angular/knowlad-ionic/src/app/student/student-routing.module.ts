import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StudentPage} from './student.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: StudentPage,
        children: [
            {
                path: '',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./student-home/student-home.module')
                            .then(m => m.StudentHomePageModule)
                    },
                    {
                        path: 'student-home',
                        loadChildren: () => import('./student-home/student-home.module')
                            .then(m => m.StudentHomePageModule)
                    },
                    {
                        path: 'student-diary',
                        loadChildren: () => import('./student-diary/student-diary.module')
                            .then(m => m.StudentDiaryPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/student/tabs/student-home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        children: [
            {
                path: 'student-attendance',
                loadChildren: () => import('./student-attendance/student-attendance.module')
                    .then(m => m.StudentAttendancePageModule)
            },
            {
                path: 'student-result',
                loadChildren: () => import('./student-result/student-result.module')
                    .then(m => m.StudentResultPageModule)
            }
        ]
    },
    {
        path: '',
        redirectTo: '/student/tabs/student-home',
        pathMatch: 'full'
    },
  {
    path: 'student-zoom',
    loadChildren: () => import('./student-zoom/student-zoom.module').then( m => m.StudentZoomPageModule)
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentPageRoutingModule {
}
