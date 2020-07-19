package edu.prahlad.casestudy.knowlad.repo;

import edu.prahlad.casestudy.knowlad.entity.DiaryStudentMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DiaryStudentMappingRepo extends JpaRepository<DiaryStudentMapping, Long> {
    List<DiaryStudentMapping> findAllByDiaryIdAndFacultyId(Long diaryId, Long facultyId);
    List<DiaryStudentMapping> findAllByStudentIdAndDiaryDate(Long studentId, LocalDate diaryDate);
    List<DiaryStudentMapping> findAllByDiaryDateAndForAllStudents(LocalDate diaryDate, boolean isForAllStudents);
    void deleteAllByDiaryIdAndFacultyId(Long diaryId, Long facultyId);
}
