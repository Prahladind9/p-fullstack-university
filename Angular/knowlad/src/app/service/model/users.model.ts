import {StudentDetailsModel} from './studentDetails.model';
import {FacultyDetailsModel} from './facultyDetails.model';

export class UsersModel {
  constructor(
    public userId: number,
    private userType: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string,
    public userName: string,
    public password: string,
    public studentDetail: StudentDetailsModel,
    public facultyDetailsModel: FacultyDetailsModel
  ) {
  }
}
