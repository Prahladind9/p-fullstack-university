package edu.prahlad.casestudy.knowlad.controller;

import edu.prahlad.casestudy.knowlad.core.StudentResultsService;
import edu.prahlad.casestudy.knowlad.entity.StudentResult;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://192.168.1.1:4200", "http://localhost:4200"})
@RestController
@RequestMapping("studentResults")
public class StudentResultsController {

    @Autowired
    private StudentResultsService studentResultsService;

    @PostMapping("getStudentResultForAcademicYearForTestType")
    public StudentResult getStudentResultForAcademicYearForTestType(@RequestBody StudentResult studentResult) throws CaseStudyException {
        return studentResultsService.getStudentResultForAcademicYearForTestType(studentResult);
    }

    @PostMapping("saveStudentResultForAcademicYearForTestType")
    public StudentResult saveStudentResultForAcademicYearForTestType(@RequestBody StudentResult studentResult) throws CaseStudyException {
        return studentResultsService.saveStudentResultForAcademicYearForTestType(studentResult);
    }

    @PostMapping("calculateRankingForAllStudents")
    public boolean calculateRankingForAllStudents() throws CaseStudyException {
        return studentResultsService.calculateRankingForAllStudents();
    }
}
