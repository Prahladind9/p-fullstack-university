package edu.prahlad.casestudy.knowlad.controller;

import edu.prahlad.casestudy.knowlad.core.StudentDetailsService;
import edu.prahlad.casestudy.knowlad.entity.StudentDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://192.168.1.1:4200", "http://localhost:4200"})
@RestController
@RequestMapping("studentDetails")
public class StudentDetailsController {

    @Autowired
    private StudentDetailsService studentDetailsService;

    @PostMapping("getStudentDetailsByStudentStandardAndStudentSection")
    public List<StudentDetails> getStudentDetailsByStudentStandardAndStudentSection(@RequestBody StudentDetails studentDetails){
        return this.studentDetailsService
                .getStudentDetailsByStudentStandardAndStudentSection(studentDetails);
    }
}
