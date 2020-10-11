export class DiaryModel {
  constructor(
    public diaryDate: Date,
    public facultyId: number,
    public studentStandard: number,
    public studentSection: string,
    public homeWork: string,
    public forAllStudents: boolean,

    public studentIdList: Array<number>,
    public diaryDetailsForStudentId: number
  ) {
  }
}
