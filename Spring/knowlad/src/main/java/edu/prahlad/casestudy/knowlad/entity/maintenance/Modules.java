package edu.prahlad.casestudy.knowlad.entity.maintenance;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="moduleId_Seq")
public class Modules {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "moduleId_Seq")
    @Column(name = "moduleId", nullable = false, updatable = false)
    private Long moduleId;
    private String moduleName;
    private String moduleRoutePath;

    private String moduleIcon;
    private String moduleImageUrl;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}
