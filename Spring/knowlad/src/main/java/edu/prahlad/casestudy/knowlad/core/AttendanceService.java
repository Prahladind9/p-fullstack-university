package edu.prahlad.casestudy.knowlad.core;

import edu.prahlad.casestudy.knowlad.entity.Attendance;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import edu.prahlad.casestudy.knowlad.repo.AttendanceRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    public Logger logger = LoggerFactory.getLogger(AttendanceService.class);

    @Autowired
    private AttendanceRepo attendanceRepo;

    public List<Attendance> getAttendanceForStudentForAcademicYear(Attendance attendanceForStudent)throws CaseStudyException {
        logger.error("getAttendanceForStudentForAcademicYear call with attendanceForStudent :: {}", attendanceForStudent);
        return this.attendanceRepo.findByAcademicYearEqualsAndStudentId
                (attendanceForStudent.getAcademicYear(), attendanceForStudent.getStudentId());
    }

    public List<Attendance> saveAttendanceForStudents(List<Attendance> attendanceForStudents)throws CaseStudyException {
        logger.error("saveAttendanceForStudents call with attendanceForStudents :: {}", attendanceForStudents);
        return this.attendanceRepo.saveAll(attendanceForStudents);
    }

}
