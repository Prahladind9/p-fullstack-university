package edu.prahlad.casestudy.knowlad.entity;

import com.fasterxml.jackson.annotation.JsonRawValue;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="diaryId_Seq")
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "diaryId_Seq")
    @Column(name = "diaryId", nullable = false, updatable = false)
    private Long diaryId;
    private Long facultyId;
    private Long studentStandard;
    private String studentSection;
    private boolean forAllStudents;
    private LocalDate diaryDate;
    private LocalDateTime diaryTimeStamp;
    private Long version;

    @Lob
    @JsonRawValue
    @Type(type = "text")
    private String homeWork;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}
