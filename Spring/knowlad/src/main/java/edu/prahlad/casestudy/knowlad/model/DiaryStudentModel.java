package edu.prahlad.casestudy.knowlad.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class DiaryStudentModel {

    private LocalDate diaryDate;
    private Long facultyId;
    private Long studentStandard;
    private String studentSection;
    private String homeWork;
    private boolean forAllStudents;

    private List<Long> studentIdList;

    private Long diaryDetailsForStudentId;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }


}
