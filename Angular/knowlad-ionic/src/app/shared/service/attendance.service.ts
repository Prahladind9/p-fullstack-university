import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/knowload.constants';
import {AttendanceModel} from '../model/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  attendance: AttendanceModel;

  constructor(private http: HttpClient) {
  }

  logMethod(message: any) {
    console.log(AttendanceService.name + ' > ' + message);
  }

  getAttendanceForStudentForAcademicYear(attendanceForStudent: AttendanceModel) {
    this.logMethod('getAttendanceForStudentForAcademicYear call for student ' + JSON.stringify(attendanceForStudent));
    return this.http.post<Array<AttendanceModel>>
      (`${API_URL}/attendance/getAttendanceForStudentForAcademicYear`, attendanceForStudent);
  }

  saveAttendanceForStudents(attendanceForStudents: Array<AttendanceModel>) {
    this.logMethod('saveAttendanceForStudents call for student ' + JSON.stringify(attendanceForStudents));
    return this.http.post<Array<AttendanceModel>>
    (`${API_URL}/attendance/saveAttendanceForStudents`, attendanceForStudents);
  }
}
