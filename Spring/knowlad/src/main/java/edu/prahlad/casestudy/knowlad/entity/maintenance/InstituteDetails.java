package edu.prahlad.casestudy.knowlad.entity.maintenance;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="instituteId_Seq")
public class InstituteDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "instituteId_Seq")
    @Column(name = "instituteId", nullable = false, updatable = false)
    private Long instituteId;
    private String instituteName;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}
