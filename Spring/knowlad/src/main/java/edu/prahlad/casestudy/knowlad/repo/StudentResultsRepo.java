package edu.prahlad.casestudy.knowlad.repo;

import edu.prahlad.casestudy.knowlad.constants.student.TestType;
import edu.prahlad.casestudy.knowlad.entity.StudentResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentResultsRepo extends JpaRepository<StudentResult, Long> {
    Optional<StudentResult>  findByStudentIdAndAcademicYearAndTestType
            (Long studentId, Long academicYear, TestType testType);

}
