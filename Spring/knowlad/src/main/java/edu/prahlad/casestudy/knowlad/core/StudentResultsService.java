package edu.prahlad.casestudy.knowlad.core;

import edu.prahlad.casestudy.knowlad.constants.ErrorCodes;
import edu.prahlad.casestudy.knowlad.entity.StudentResult;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import edu.prahlad.casestudy.knowlad.repo.StudentResultsRepo;
import edu.prahlad.casestudy.knowlad.utility.KnowladUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentResultsService {
    public Logger logger = LoggerFactory.getLogger(StudentResultsService.class);

    @Autowired
    private KnowladUtility knowladUtility;

    @Autowired
    private StudentResultsRepo studentResultsRepo;

    public StudentResult getStudentResultForAcademicYearForTestType(StudentResult studentResult)
    throws CaseStudyException {
        logger.error("getStudentResultForAcademicYearForTestType for {} ", studentResult);

        //todo to uncomment the below and change the logic
        Optional<StudentResult> studentResultFound
                = studentResultsRepo.
                findByStudentIdAndAcademicYearAndTestType
                        (studentResult.getStudentId(), studentResult.getAcademicYear(),
                                studentResult.getTestType());

        /*Optional<StudentResult> studentResultFound
                = studentResultsRepo.
                findByStudentId(studentResult.getStudentId());*/

        if(studentResultFound.isPresent()){
            return studentResultFound.get();
        }else {
            throw new CaseStudyException(ErrorCodes.E_NO_USER_STUDENT_RESULT_FOUND, "");
        }

    }


    public StudentResult saveStudentResultForAcademicYearForTestType(StudentResult studentResult)throws CaseStudyException {
        logger.error("saveStudentResultForAcademicYearForTestType for {} ", studentResult);

        logger.error("(1)-(a) Calculate Total Marks for Student {} ", studentResult);
        int totalMarks = studentResult.getFirstLanguage() + studentResult.getSecondLanguage() + studentResult.getThirdLanguage()
                        + studentResult.getMaths() + studentResult.getScience() + studentResult.getSocial();
        studentResult.setTotal(totalMarks);
        logger.error("(1)-(b) Calculated Total Marks for Student {} ", totalMarks);

        logger.error("(2)-(a) Check whether Student has Passed/Failed with minimum pass marks set is {} ", knowladUtility.getPassMarks());
        boolean isPassed = true;

        if(studentResult.getFirstLanguage()  < knowladUtility.getPassMarks()) {
            isPassed = false;
            logger.error("(2)-(b)-(1) Student has Failed in FirstLanguage, with score {} ", studentResult.getFirstLanguage());
        }

        if(studentResult.getSecondLanguage()  < knowladUtility.getPassMarks()) {
            isPassed = false;
            logger.error("(2)-(b)-(2) Student has Failed in SecondLanguage, with score {} ", studentResult.getSecondLanguage());
        }

        if(studentResult.getThirdLanguage()  < knowladUtility.getPassMarks()) {
            isPassed = false;
            logger.error("(2)-(b)-(3) Student has Failed in ThirdLanguage, with score {} ", studentResult.getThirdLanguage());
        }

        if(studentResult.getMaths()  < knowladUtility.getPassMarks()) {
            isPassed = false;
            logger.error("(2)-(b)-(4) Student has Failed in Maths, with score {} ", studentResult.getMaths());
        }

        if(studentResult.getScience()  < knowladUtility.getPassMarks()) {
            isPassed = false;
            logger.error("(2)-(b)-(5) Student has Failed in Science, with score {} ", studentResult.getScience());
        }

        if(studentResult.getSocial()  < knowladUtility.getPassMarks()) {
            isPassed = false;
            logger.error("(2)-(b)-(6) Student has Failed in Social, with score {} ", studentResult.getSocial());
        }

        logger.error("(2)-(c) Student Pass/Fail Status {} ", isPassed);
        studentResult.setPassed(isPassed);

        return this.studentResultsRepo.save(studentResult);
    }


    /**
     * Check Class-Section wise Student score and rank them according to their sections
     * @return
     * @throws CaseStudyException
     */
    public boolean calculateRankingForAllStudents()throws CaseStudyException {
        logger.error("calculateRankingForStudents");

        return true;
    }

}
