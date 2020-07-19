package edu.prahlad.casestudy.knowlad.entity;

import edu.prahlad.casestudy.knowlad.constants.student.TestType;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;
import java.time.Year;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="studentResultId_Seq")
public class StudentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "studentResultId_Seq")
    @Column(name = "studentResultId", nullable = false, updatable = false)
    private Long studentResultId;

    @Column(name = "studentId", nullable = false, updatable = false)
    private Long studentId;

    private Long academicYear;

    @Enumerated(EnumType.STRING)
    private TestType testType;

    private int firstLanguage;
    private int secondLanguage;
    private int thirdLanguage;

    private int maths;
    private int science;
    private int social;

    private int total;

    private int overallRank;
    private boolean passed;

    //isSubjectEnabled - we'll think later

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}
