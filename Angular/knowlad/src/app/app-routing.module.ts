import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayComponent} from './play/play.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ResultComponent} from './result/result.component';
import {AttendanceComponent} from './attendance/attendance.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ResultTeacherComponent} from './result-teacher/result-teacher.component';
import {AttendanceTeacherComponent} from './attendance-teacher/attendance-teacher.component';
import {DiaryTeacherComponent} from './diary-teacher/diary-teacher.component';
import {DiaryComponent} from './diary/diary.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'play', component: PlayComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'Homepage', component: HomepageComponent},
  {path: 'HomepageTeacher', component: HomepageComponent},
  {path: 'Result', component: ResultComponent},
  {path: 'ResultTeacher', component: ResultTeacherComponent},
  {path: 'Diary', component: DiaryComponent},
  {path: 'DiaryTeacher', component: DiaryTeacherComponent},
  {path: 'Attendance', component: AttendanceComponent},
  {path: 'AttendanceTeacher', component: AttendanceTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
