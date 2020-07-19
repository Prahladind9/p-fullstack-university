package edu.prahlad.casestudy.knowlad.entity;

import edu.prahlad.casestudy.knowlad.constants.Gender;
import edu.prahlad.casestudy.knowlad.constants.institute.InstituteCategory;
import edu.prahlad.casestudy.knowlad.constants.institute.InstituteSubCategory;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="studentId_Seq")
public class StudentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "studentId_Seq")
    @Column(name = "studentId", nullable = false, updatable = false)
    private Long studentId;

    private String studentName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private InstituteCategory instituteCategory;

    @Enumerated(EnumType.STRING)
    private InstituteSubCategory instituteSubCategory;

    private int studentStandard;
    private String studentSection;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}
