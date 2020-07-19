package edu.prahlad.casestudy.knowlad.repo;

import edu.prahlad.casestudy.knowlad.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DiaryRepo extends JpaRepository<Diary, Long> {
    Optional<Diary> findByFacultyIdAndDiaryDateEqualsAndStudentStandardAndStudentSection
            (Long facultyId, LocalDate diaryDate, Long studentStandard, String studentSection);
}
