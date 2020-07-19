import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentResultModel} from '../model/studentResult.model';
import {API_URL} from '../constants/knowload.constants';
import {StudentDetailsModel} from '../model/studentDetails.model';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  constructor(private http: HttpClient) {
  }

  logMethod(message: any) {
    console.log(StudentDetailsService.name + ' > ' + message);
  }

  getStudentDetailsByStudentStandardAndStudentSection(studentDetailsModel: StudentDetailsModel){
    this.logMethod('getStudentDetailsByStudentStandardAndStudentSection call for student ' + studentDetailsModel);
    return this.http.post<Array<StudentDetailsModel>>
    (`${API_URL}/studentDetails/getStudentDetailsByStudentStandardAndStudentSection`,
      studentDetailsModel);
  }
}
