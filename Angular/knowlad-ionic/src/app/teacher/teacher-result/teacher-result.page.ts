import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentResultModel} from '../../shared/model/studentResult.model';
import {StudentDetailsModel} from '../../shared/model/studentDetails.model';
import {Router} from '@angular/router';
import {StudentDetailsService} from '../../shared/service/student-details.service';
import {ResultService} from '../../shared/service/result.service';
import {ClassSection} from '../../shared/interface/class-section';
import {ExamType} from '../../shared/interface/exam-type';
import {MaintenanceService} from '../../shared/service/maintenance.service';


@Component({
    selector: 'app-teacher-result',
    templateUrl: './teacher-result.page.html',
    styleUrls: ['./teacher-result.page.scss'],
})
export class TeacherResultPage implements OnInit {

    constructor(
        private router: Router,
        private _formBuilder: FormBuilder,
        private maintenanceService: MaintenanceService,
        private studentDetailsService: StudentDetailsService,
        private resultService: ResultService) {
        this.logMethod('constructor ' , this.studentResult);
        this.sections = this.maintenanceService.classSection;
        this.examTypes = this.maintenanceService.examType;
    }

    isLinear = false;
    firstFormGroup: FormGroup;
    resultFormGroup: FormGroup;

    studentResult: StudentResultModel;

    sections: ClassSection[];
    examTypes: ExamType[];

    /*studentStandard = new FormControl(this.sections[0].value);
    examTypeControl = new FormControl(this.examTypes[0].value);*/
    studentStandard = new FormControl();
    examTypeControl = new FormControl();
    studentControl = new FormControl();

    formHide = false;

    studentDetailsModel: StudentDetailsModel;
    studentDetailsModelList: Array<StudentDetailsModel>;

    studentResultModel: StudentResultModel;

    logMethod(message: any, value: any) {
        console.log(TeacherResultPage.name + ' > ' + message +  ' > ' + JSON.stringify(value));
    }


    ngOnInit(): void {
        this.firstFormGroup = this._formBuilder.group({
            studentClass: [this.studentStandard, Validators.required],
            testType: [this.examTypeControl, Validators.required],
            student: [this.studentControl, Validators.required]
        });
        this.logMethod('ngOnInit (0)' , this.firstFormGroup.value);


        this.resultFormGroup = new FormGroup(
            {
                firstLanguage: new FormControl(0, Validators.required),
                secondLanguage: new FormControl(0, Validators.required),
                thirdLanguage: new FormControl(0, Validators.required),
                maths: new FormControl(0, Validators.required),
                science: new FormControl(0, Validators.required),
                social: new FormControl(0, Validators.required)
            }
        );
        this.logMethod('ngOnInit (1)' , this.resultFormGroup.value);

    }


    getStudentsList() {
        this.formHide = !this.formHide;
        this.logMethod('getStudentsList-(0)', null);
        this.logMethod('getStudentsList-(1) build studentDetailsModel for Section ' , this.studentStandard.value);
        this.studentDetailsModel = new StudentDetailsModel(
            null, null, null, null, null,
            this.studentStandard.value, 'A'
        );

        this.logMethod('getStudentsList-(2) call getStudentDetailsByStudentStandardAndStudentSection with ' , this.studentDetailsModel);
        this.studentDetailsService.getStudentDetailsByStudentStandardAndStudentSection(this.studentDetailsModel)
            .subscribe(
                response => {
                    this.logMethod('getStudentsList-(3) call response ' , response);
                    this.studentDetailsModelList = response;
                    this.logMethod('getStudentsList-(4) parsed studentDetailsModelList ', this.studentDetailsModelList);
                },
                error => {
                    this.logMethod('getStudentDetailsByStudentStandardAndStudentSection - error ' , error);
                }
            );

    }

    showResultsFlag() {
        this.formHide = !this.formHide;
    }

    uploadResult() {
        this.logMethod('uploadResult - (1) - ResultFormData ' , this.resultFormGroup.value);
        this.logMethod('uploadResult - (2) - build Result Data ', null);
        this.studentResultModel = new StudentResultModel(
            null,
            this.studentControl.value,
            2020, this.examTypeControl.value,
            this.resultFormGroup.get('firstLanguage').value,
            this.resultFormGroup.get('secondLanguage').value,
            this.resultFormGroup.get('thirdLanguage').value,
            this.resultFormGroup.get('maths').value,
            this.resultFormGroup.get('science').value,
            this.resultFormGroup.get('social').value,
            null, null, null
        );

        this.logMethod('uploadResult -(3)- saveStudentResultForAcademicYearForTestType call with Result Data ', this.studentResultModel);
        this.resultService.saveStudentResultForAcademicYearForTestType(this.studentResultModel)
            .subscribe(
                response => {
                    this.logMethod('uploadResult-(4) response ' , response);
                },
                error => {
                    this.logMethod('saveStudentResultForAcademicYearForTestType error ' , error);
                }
            );

        this.resultFormGroup.reset();

    }

}
