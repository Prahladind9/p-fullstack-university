package edu.prahlad.casestudy.knowlad.repo;

import edu.prahlad.casestudy.knowlad.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
    List<Attendance> findByAcademicYearEqualsAndStudentId(Integer academicYear, Long studentId);
}
