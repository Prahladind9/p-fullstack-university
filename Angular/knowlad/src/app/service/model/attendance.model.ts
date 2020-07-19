export class AttendanceModel {
  //todo - remove month and dayOfWeek
  constructor(
    public attendanceId: number,
    public facultyId: number,
    public studentId: number,
    public academicYear: number,
    public month: number,
    public dayOfWeek: number,
    public attendanceDate: Date,
    public attendanceStatus: string
  ) {
  }
}
