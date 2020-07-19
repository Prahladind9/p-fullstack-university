package edu.prahlad.casestudy.knowlad.controller;

import edu.prahlad.casestudy.knowlad.core.AttendanceService;
import edu.prahlad.casestudy.knowlad.entity.Attendance;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://192.168.1.1:4200", "http://localhost:4200", "https://379f0bb118ab.ngrok.io", "https://379f0bb118ab.ngrok.io"})
@RestController
@RequestMapping("attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("getAttendanceForStudentForAcademicYear")
    public List<Attendance> getAttendanceForStudentResultForAcademicYear(@RequestBody Attendance attendanceForStudent) throws CaseStudyException {
        return this.attendanceService.getAttendanceForStudentForAcademicYear(attendanceForStudent);
    }

    @PostMapping("saveAttendanceForStudents")
    public List<Attendance> saveAttendanceForStudents(@RequestBody List<Attendance> attendanceForStudents)throws CaseStudyException {
        return this.attendanceService.saveAttendanceForStudents(attendanceForStudents);
    }
}
