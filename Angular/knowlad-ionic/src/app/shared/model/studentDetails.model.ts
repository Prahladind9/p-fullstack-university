export class StudentDetailsModel {
  constructor(
    public studentId: number,
    public studentName: string,
    private gender: string,
    public instituteCategory: string,
    public instituteSubCategory: string,
    public studentStandard: number,
    public studentSection: string,
    public isPresentStatus: boolean = false
  ) {
  }
}
