package edu.prahlad.casestudy.knowlad.core;

import edu.prahlad.casestudy.knowlad.entity.Diary;
import edu.prahlad.casestudy.knowlad.entity.DiaryStudentMapping;
import edu.prahlad.casestudy.knowlad.entity.FacultyDetails;
import edu.prahlad.casestudy.knowlad.model.CaseStudyException;
import edu.prahlad.casestudy.knowlad.model.DiaryStudentModel;
import edu.prahlad.casestudy.knowlad.repo.DiaryRepo;
import edu.prahlad.casestudy.knowlad.repo.DiaryStudentMappingRepo;
import edu.prahlad.casestudy.knowlad.repo.FacultyDetailsRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackFor = {Exception.class, CaseStudyException.class})
public class DiaryService {
    public Logger logger = LoggerFactory.getLogger(DiaryService.class);

    @Autowired
    private FacultyDetailsRepo facultyDetailsRepo;

    @Autowired
    private DiaryRepo diaryRepo;

    @Autowired
    private DiaryStudentMappingRepo diaryStudentMappingRepo;


    public List<String> getDiaryForDiaryDateForStudentId(DiaryStudentModel diaryStudentModel){
        logger.error("getDiaryForDiaryDateForStudentId call with diaryStudentModel {} ", diaryStudentModel);

        logger.error("(1)-(a) Fetch DiaryStudentMapping Records for the StudentId and DiaryDate");

        List<DiaryStudentMapping> diaryStudentMappings =
                diaryStudentMappingRepo
                        .findAllByDiaryDateAndForAllStudents(diaryStudentModel.getDiaryDate(), true);

        diaryStudentMappings.addAll(
                diaryStudentMappingRepo
                        .findAllByStudentIdAndDiaryDate(
                                diaryStudentModel.getDiaryDetailsForStudentId(),
                                diaryStudentModel.getDiaryDate()));
        logger.error("(1)-(b) Fetched DiaryStudentMapping Records for the StudentId and DiaryDate :: {}", diaryStudentMappings);

        logger.error("(2)-(a) Fetch DiaryId's from DiaryStudentMapping for the given combination");
        List<Long> diaryIds = diaryStudentMappings.stream().distinct().map(DiaryStudentMapping::getDiaryId)
                .collect(Collectors.toList());
        logger.error("(2)-(b) Fetched DiaryId's from DiaryStudentMapping for the given combination :: {}", diaryIds);

        logger.error("(3)-(a) Fetch DiaryId Records from Diary for the given DiaryIds");
        List<Diary> diaryList =  diaryRepo.findAllById(diaryIds);
        logger.error("(3)-(b) Fetched DiaryId Records from Diary for the given DiaryIds :: {} ", diaryList);


        logger.error("(4)-(a) Fetch FacultyId's from Diary for the given combination");
        List<Long> facultyIds = diaryList.stream().distinct().map(Diary::getFacultyId)
                .collect(Collectors.toList());
        logger.error("(4)-(b) Fetched FacultyId's from Diary for the given combination :: {}", facultyIds);


        logger.error("(5)-(a) Fetch Faculty Records from Faculty Details");
        List<FacultyDetails> facultyDetailsList = facultyDetailsRepo.findAllById(facultyIds);
        logger.error("(5)-(b) Fetched Faculty Records from Faculty Details:: {}", facultyDetailsList);


        logger.error("(4)-(a) Build homeWorksForDiaryDate Records from Diary");
        List<String> homeWorksForDiaryDate = new ArrayList<>();
        homeWorksForDiaryDate.add("Thought of the day - 'Honesty is best policy'");
        for(Diary diary: diaryList){

            String homeWork =
                     facultyDetailsList.stream()
                            .filter(t -> t.getFacultyId().equals(diary.getFacultyId()))
                            .map(FacultyDetails::getSubject)
                            .collect(Collectors.joining())
                    + " (posted by "
                    + facultyDetailsList.stream()
                            .filter(t -> t.getFacultyId().equals(diary.getFacultyId()))
                            .map(FacultyDetails::getFacultyName)
                            .collect(Collectors.joining())
                    + ")\n"
                    +  diary.getHomeWork();

            homeWorksForDiaryDate.add(homeWork);
        }

        logger.error("(4)-(b) HomeWorks ForDiaryDate from Diary Records :: {} ", homeWorksForDiaryDate);

        return homeWorksForDiaryDate;

    }


    public Diary saveDiaryForDiaryDate(DiaryStudentModel diaryStudentModel) throws CaseStudyException {
        logger.error("saveDiaryForDiaryDate call with diaryStudentModel {} ", diaryStudentModel);

        logger.error("(1) Check Existing Diary Record for the combination");
        Optional<Diary> diaryRecordCheck =
                diaryRepo.findByFacultyIdAndDiaryDateEqualsAndStudentStandardAndStudentSection(
                        diaryStudentModel.getFacultyId(), diaryStudentModel.getDiaryDate(),
                        diaryStudentModel.getStudentStandard(), diaryStudentModel.getStudentSection()
                );

        if(diaryRecordCheck.isPresent()){
            logger.error("(2)-(a) Record Exists, Updating the Diary - home work for combination before :: {} ", diaryRecordCheck.get());
            diaryRecordCheck.get().setVersion(diaryRecordCheck.get().getVersion() + 1 );
            diaryRecordCheck.get().setHomeWork(
                                diaryRecordCheck.get().getHomeWork()
                                        + "\n"
                                        + diaryRecordCheck.get().getVersion() + ") "
                                        + diaryStudentModel.getHomeWork()
            );
            diaryRepo.save(diaryRecordCheck.get());
            logger.error("(2)-(b) Record Exists, Updating the Diary - home work for combination after :: {} ", diaryRecordCheck.get());

            logger.error("(3) Update DiaryStudentMappingForDiaryId ");
            saveDiaryStudentMappingForDiaryId(diaryRecordCheck.get(), diaryStudentModel);

            logger.error("(4) Update Diary & DiaryStudentMapping  - Success ");
            return diaryRecordCheck.get();
        }else{
            logger.error("(2)-(a) No Record Exists, Create Record for Diary - Home work for combination ");
            Diary diary = new Diary();
            diary.setVersion(0L);
            diary.setFacultyId(diaryStudentModel.getFacultyId());
            diary.setDiaryDate(diaryStudentModel.getDiaryDate());
            diary.setDiaryTimeStamp(LocalDateTime.now());
            diary.setStudentStandard(diaryStudentModel.getStudentStandard());
            diary.setStudentSection(diaryStudentModel.getStudentSection());

            diary = diaryRepo.save(diary);
            logger.error("(2)-(b) New Diary Record :: {} ", diary);

            logger.error("(3) Save DiaryStudentMappingForDiaryId ");
            saveDiaryStudentMappingForDiaryId(diary, diaryStudentModel);

            logger.error("(4) Save/New Record -  Diary & DiaryStudentMapping  - Success ");
            return diary;
        }

    }

    private boolean saveDiaryStudentMappingForDiaryId(Diary diaryRecord, DiaryStudentModel diaryStudentModel)throws CaseStudyException{
        logger.error("saveDiaryStudentMappingForDiaryId call with diaryRecord:: {} & diaryStudentModel {} ", diaryRecord, diaryStudentModel);

        logger.error("(1) Check for records in DiaryStudentMapping for the given combination");
        List<DiaryStudentMapping> diaryStudentMappingList =
                diaryStudentMappingRepo.findAllByDiaryIdAndFacultyId(diaryRecord.getDiaryId(), diaryRecord.getFacultyId());

        if(diaryStudentMappingList.size() > 0) {
            logger.error("(2) Yes, there are records for the given combination ==> DiaryStudentMapping Records shall be update");

            logger.error("(3) Check if DiaryStudentMapping is for All Students (isForAllStudents=True)==> then No Need to update");
            boolean isForAllStudents = diaryStudentMappingList.stream()
                                                .distinct().map(DiaryStudentMapping::isForAllStudents)
                                                .collect(Collectors.toList())
                                                .get(0);

            if(isForAllStudents & diaryStudentModel.isForAllStudents()){
                logger.error("(4) DiaryStudentMapping is for All Students (isForAllStudents=True) ==> No Need to update");

            }else if(isForAllStudents & !diaryStudentModel.isForAllStudents()){
                logger.error("(4)-(a) Existing DiaryStudentMapping (diaryStudentMappingList.isForAllStudents=True) and (diaryStudentModel.isForAllStudents=False)");
                logger.error("(4)-(b) Need to Update the DiaryStudentMapping ==> (1) ==> (5) First Delete One Unique DiaryStudentMapping-DiaryId  Record ");
                logger.error("(4)-(b) Need to Update the DiaryStudentMapping ==> (2) ==> (6) Second Create New Records for the given StudentId combination ");

                logger.error("(5) Delete the Existing -  DiaryStudentMapping-DiaryId Record :: {} ", diaryStudentMappingList.get(0).getDiaryStudentMappingId());
                diaryStudentMappingRepo.deleteById(diaryStudentMappingList.get(0).getDiaryStudentMappingId());

                logger.error("(6) Create New Records for the given StudentId combination");
                saveDiaryStudentMappingForSomeStudentIds(diaryRecord, diaryStudentModel);

                logger.error("(7) Successfully saved diaryStudentMappingListForSomeStudents");

            }else if(!isForAllStudents & diaryStudentModel.isForAllStudents()){
                logger.error("(4)-(a) Existing DiaryStudentMapping (diaryStudentMappingList.isForAllStudents=False) and (diaryStudentModel.isForAllStudents=True)");
                logger.error("(4)-(b) Need to Update the DiaryStudentMapping ==> (1) ==> (5) First Delete All Existing Records for DiaryStudentMapping Mapping ");
                logger.error("(4)-(b) Need to Update the DiaryStudentMapping ==> (2) ==> (6) Second Create One Unique Record for the given combination ");

                logger.error("(5) Delete tAll Existing Records for DiaryStudentMapping Mapping ");
                diaryStudentMappingRepo.deleteAllByDiaryIdAndFacultyId(diaryRecord.getDiaryId(), diaryRecord.getFacultyId());

                logger.error("(6) Create One Unique Record for the given combination");
                saveDiaryStudentMappingForAllStudents(diaryRecord, diaryStudentModel);

                logger.error("(7) Successfully saved saveDiaryStudentMappingForAllStudents");

            }else{
                logger.error("(4)-(a) Existing DiaryStudentMapping (diaryStudentMappingList.isForAllStudents=False) and (diaryStudentModel.isForAllStudents=False)");
                logger.error("(4)-(b) Need to Update the DiaryStudentMapping ==> (1) ==> (5) Check the existing StudentId Records and remove all records --> cleaner than checking and adding the missing DiaryStudentMapping Mapping ");
                logger.error("(4)-(b) Need to Update the DiaryStudentMapping ==> (2) ==> (6) Second Create New Records for the given StudentId combination ");

                logger.error("(5) Delete tAll Existing Records for DiaryStudentMapping Mapping ");
                diaryStudentMappingRepo.deleteAllByDiaryIdAndFacultyId(diaryRecord.getDiaryId(), diaryRecord.getFacultyId());

                logger.error("(6) Create New Records for the given StudentId combination");
                saveDiaryStudentMappingForSomeStudentIds(diaryRecord, diaryStudentModel);

                logger.error("(7) Successfully saved diaryStudentMappingListForSomeStudents");
            }

        }else {
            logger.error("(2) No, there are records for the given combination ==> DiaryStudentMapping Records shall be created");

            if(diaryStudentModel.isForAllStudents()){
                logger.error("(3) DiaryStudentMapping is for All Students (isForAllStudents=True) ==> No StudentId will be mapped");

                saveDiaryStudentMappingForAllStudents(diaryRecord, diaryStudentModel);
                logger.error("(4) DiaryStudentMapping saved successfully");

            }else{
                logger.error("(3) DiaryStudentMapping is for Some Students (isForAllStudents=False) ==> Separate StudentId record will be mapped :: {}",
                        diaryStudentModel.getStudentIdList());

                saveDiaryStudentMappingForSomeStudentIds(diaryRecord, diaryStudentModel);
                logger.error("(4) Successfully saved diaryStudentMappingListForSomeStudents");
            }

        }

        return true;
    }


    private boolean saveDiaryStudentMappingForAllStudents(Diary diaryRecord, DiaryStudentModel diaryStudentModel) throws CaseStudyException{
        logger.error("saveDiaryStudentMappingForAllStudents Call with diaryRecord:: {} & diaryStudentModel {} ", diaryRecord, diaryStudentModel);

        logger.error("(1) DiaryStudentMapping build DiaryStudentMappingForAllStudents");
        DiaryStudentMapping diaryStudentMappingForAllStudents = new DiaryStudentMapping();
        diaryStudentMappingForAllStudents.setForAllStudents(diaryStudentModel.isForAllStudents());

        diaryStudentMappingForAllStudents.setDiaryId(diaryRecord.getDiaryId());
        diaryStudentMappingForAllStudents.setFacultyId(diaryRecord.getFacultyId());
        diaryStudentMappingForAllStudents.setStudentStandard(diaryRecord.getStudentStandard());
        diaryStudentMappingForAllStudents.setStudentSection(diaryRecord.getStudentSection());
        diaryStudentMappingForAllStudents.setDiaryDate(diaryRecord.getDiaryDate());

        diaryStudentMappingForAllStudents = diaryStudentMappingRepo.save(diaryStudentMappingForAllStudents);

        logger.error("(2) DiaryStudentMapping saved successfully for diaryStudentMappingForAllStudents :: {}", diaryStudentMappingForAllStudents);

        return true;
    }

    private boolean saveDiaryStudentMappingForSomeStudentIds(Diary diaryRecord, DiaryStudentModel diaryStudentModel) throws CaseStudyException{

        logger.error("saveDiaryStudentMappingForStudentIds Call with diaryRecord:: {} & diaryStudentModel {} ", diaryRecord, diaryStudentModel);

        logger.error("(1) DiaryStudentMapping build diaryStudentMappingListForSomeStudents");
        List<DiaryStudentMapping> diaryStudentMappingListForSomeStudents  = new ArrayList<>();

        for(Long studentId: diaryStudentModel.getStudentIdList()){
            DiaryStudentMapping diaryStudentModelRecord = new DiaryStudentMapping();
            diaryStudentModelRecord.setForAllStudents(diaryStudentModel.isForAllStudents());

            diaryStudentModelRecord.setDiaryId(diaryRecord.getDiaryId());
            diaryStudentModelRecord.setFacultyId(diaryRecord.getFacultyId());
            diaryStudentModelRecord.setStudentStandard(diaryRecord.getStudentStandard());
            diaryStudentModelRecord.setStudentSection(diaryRecord.getStudentSection());
            diaryStudentModelRecord.setDiaryDate(diaryRecord.getDiaryDate());

            diaryStudentModelRecord.setStudentId(studentId);
            diaryStudentMappingListForSomeStudents.add(diaryStudentModelRecord);
        }
        logger.error("(2) DiaryStudentMapping is for Some Students is completed :: {}", diaryStudentMappingListForSomeStudents);

        diaryStudentMappingRepo.saveAll(diaryStudentMappingListForSomeStudents);

        return true;
    }
}
