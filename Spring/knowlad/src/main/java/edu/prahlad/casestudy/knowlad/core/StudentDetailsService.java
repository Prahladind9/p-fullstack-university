package edu.prahlad.casestudy.knowlad.core;

import edu.prahlad.casestudy.knowlad.entity.StudentDetails;
import edu.prahlad.casestudy.knowlad.repo.StudentDetailsRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentDetailsService {
    public Logger logger = LoggerFactory.getLogger(StudentDetailsService.class);

    @Autowired
    private StudentDetailsRepo studentDetailsRepo;

    public List<StudentDetails> getStudentDetailsByStudentStandardAndStudentSection(StudentDetails studentDetails){
        logger.error("getStudentDetailsByStudentStandardAndStudentSection API call");
        return this.studentDetailsRepo.findAllByStudentStandardAndStudentSection
                (studentDetails.getStudentStandard(), studentDetails.getStudentSection());
    }
}
