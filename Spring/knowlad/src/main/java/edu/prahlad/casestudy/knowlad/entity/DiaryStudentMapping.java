package edu.prahlad.casestudy.knowlad.entity;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="diaryStudentMappingId_Seq")
public class DiaryStudentMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "diaryStudentMappingId_Seq")
    @Column(name = "diaryStudentMappingId", nullable = false, updatable = false)
    private Long diaryStudentMappingId;

    @Column(name = "diaryId", nullable = false, updatable = false)
    private Long diaryId;

    @Column(name = "facultyId", nullable = false, updatable = false)
    private Long facultyId;
    private Long studentStandard;
    private String studentSection;
    private Long studentId;
    private LocalDate diaryDate;
    private boolean forAllStudents;
    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}
