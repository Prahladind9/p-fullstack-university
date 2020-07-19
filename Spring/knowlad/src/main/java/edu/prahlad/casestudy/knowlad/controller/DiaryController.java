package edu.prahlad.casestudy.knowlad.controller;

import edu.prahlad.casestudy.knowlad.core.DiaryService;
import edu.prahlad.casestudy.knowlad.entity.Attendance;
import edu.prahlad.casestudy.knowlad.entity.Diary;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import edu.prahlad.casestudy.knowlad.model.DiaryStudentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = {"http://192.168.1.1:4200", "http://localhost:4200", "https://379f0bb118ab.ngrok.io", "https://379f0bb118ab.ngrok.io"})
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("diary")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @PostMapping("getDiaryForDiaryDateForStudentId")
    public List<String> getDiaryForDiaryDateForStudentId(@RequestBody DiaryStudentModel diaryStudentModel) throws CaseStudyException {
        return this.diaryService.getDiaryForDiaryDateForStudentId(diaryStudentModel);
    }

    @PostMapping("saveDiaryForDiaryDate")
    public Diary saveDiaryForDiaryDate(@RequestBody DiaryStudentModel diaryStudentModel) throws CaseStudyException {
        return this.diaryService.saveDiaryForDiaryDate(diaryStudentModel);
    }


}
