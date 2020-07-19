package edu.prahlad.casestudy.knowlad.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.prahlad.casestudy.knowlad.constants.user.UserType;
import edu.prahlad.casestudy.knowlad.entity.maintenance.InstituteDetails;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name ="userId_Seq")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userId_Seq")
    @Column(name = "userId", nullable = false, updatable = false)
    private Long userId;

    @OneToOne
    private StudentDetails studentDetails;

    @OneToOne
    private FacultyDetails facultyDetails;

    private String userName;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    private String firstName;
    private String lastName;
//    @Column(name = "email", nullable = false, unique = true)
    private String email;
    private String phone;
    private boolean enabled= true;

    @ManyToOne
    @JoinColumn(name = "institute_Id")
    @JsonIgnore
    private InstituteDetails instituteDetails;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }

}
