import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants/knowload.constants';
import {DiaryModel} from '../model/diary.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  diary: DiaryModel;
  constructor(private http: HttpClient) {
  }

  logMethod(message: any) {
    console.log(DiaryService.name + ' > ' + message);
  }

  getDiaryForDiaryDateForStudentId(diaryModel: DiaryModel) {
    this.logMethod('getDiaryForDiaryDateForStudentId call for diaryModel ' + diaryModel);
    return this.http.post<Array<string>>
    (`${API_URL}/diary/getDiaryForDiaryDateForStudentId`, diaryModel);
  }

  saveDiaryForDiaryDate(diaryModel: DiaryModel) {
    this.logMethod('saveDiaryForDiaryDate call for diaryModel ' + diaryModel);
    //todo check the parsing we are getting Diary Entity - whereas avilable mapping is DiaryModel
    return this.http.post<any>
    (`${API_URL}/diary/saveDiaryForDiaryDate`, diaryModel);
  }
}
