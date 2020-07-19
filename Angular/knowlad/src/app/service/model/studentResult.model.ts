// tslint:disable-next-line:class-name
export class StudentResultModel {
  constructor(
    public studentResultId: number,
    public studentId: number,
    public academicYear: number,
    public testType: string,
    public firstLanguage: number,
    public secondLanguage: number,
    public thirdLanguage: number,
    public maths: number,
    public science: number,
    public social: number,
    public total: number,
    public overallRank: number,
    public passed: boolean
  ) {
  }
}
