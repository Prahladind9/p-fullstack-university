export class FacultyDetailsModel {
  constructor(
    public facultyId: number,
    public facultyName: string,
    private gender: string,
    public instituteCategory: string,
    public instituteSubCategory: string,
    public subject: string
  ) {
  }
}
