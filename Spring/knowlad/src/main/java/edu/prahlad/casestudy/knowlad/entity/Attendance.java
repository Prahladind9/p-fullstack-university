package edu.prahlad.casestudy.knowlad.entity;

import edu.prahlad.casestudy.knowlad.constants.student.AttendanceStatus;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="attendanceId_Seq")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "attendanceId_Seq")
    @Column(name = "attendanceId", nullable = false, updatable = false)
    private Long attendanceId;

    private Long facultyId;
    private Long studentId;

    private Integer academicYear;

    //todo - remove - not Required
    private Integer month;

    //todo - remove - not Required
    private Integer dayOfWeek;
//    private Integer dayOfMonth;

    private LocalDate attendanceDate;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus attendanceStatus;
    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}
