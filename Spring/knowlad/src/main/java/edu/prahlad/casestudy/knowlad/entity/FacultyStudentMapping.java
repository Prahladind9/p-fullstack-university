package edu.prahlad.casestudy.knowlad.entity;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="facultyStudentMappingId_Seq")
public class FacultyStudentMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "facultyStudentMappingId_Seq")
    @Column(name = "facultyStudentMappingId", nullable = false, updatable = false)
    private Long facultyStudentMappingId;

    private Long facultyId;
    private int studentStandard;
    private String studentSection;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }


}
