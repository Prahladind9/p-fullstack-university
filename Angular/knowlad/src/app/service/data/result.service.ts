import {Injectable} from '@angular/core';
import {API_URL} from '../constants/knowload.constants';
import {HttpClient} from '@angular/common/http';
import {StudentResultModel} from 'src/app/service/model/studentResult.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) {
  }

  logMethod(message: any) {
    console.log(ResultService.name + ' > ' + message);
  }

  getStudentResultForAcademicYearForTestType(studentResult: StudentResultModel) {
    this.logMethod('getResultForStudent call for student ' + studentResult);
    return this.http.post<StudentResultModel>(`${API_URL}/studentResults/getStudentResultForAcademicYearForTestType`,
      studentResult);
  }

  saveStudentResultForAcademicYearForTestType(studentResult: StudentResultModel) {
    this.logMethod('saveStudentResultForAcademicYearForTestType call for student ' + studentResult);
    return this.http.post<StudentResultModel>(`${API_URL}/studentResults/saveStudentResultForAcademicYearForTestType`,
      studentResult);
  }

  calculateRankingForAllStudents() {
    this.logMethod('calculateRankingForAllStudents call for student ' + StudentResultModel);
    return this.http.get<boolean>(`${API_URL}/studentResults/calculateRankingForAllStudents`);
  }
}
