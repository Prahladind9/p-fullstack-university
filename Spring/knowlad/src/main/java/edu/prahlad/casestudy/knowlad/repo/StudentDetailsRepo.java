package edu.prahlad.casestudy.knowlad.repo;

import edu.prahlad.casestudy.knowlad.entity.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentDetailsRepo extends JpaRepository<StudentDetails, Long> {
    List<StudentDetails> findAllByStudentStandardAndStudentSection(int studentStandard, String studentSection);
}
