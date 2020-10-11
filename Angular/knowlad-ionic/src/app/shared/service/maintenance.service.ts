import { Injectable } from '@angular/core';
import {ClassSection} from '../interface/class-section';
import {ExamType} from '../interface/exam-type';
import {UpdateModel} from '../model/update.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private sections: ClassSection[] = [
    {value: '1', section: 'A', viewValue: '(1-A)'},
    {value: '2', section: 'A', viewValue: '(2-A)'},
    {value: '3', section: 'A', viewValue: '(3-A)'}
  ];
  private examTypes: ExamType[] = [
    {value: 'U1', viewValue: 'Unit Exam - 1'},
    {value: 'U2', viewValue: 'Unit Exam - 2'},
    {value: 'Q', viewValue: 'Quarterly Exam'},
    {value: 'H', viewValue: 'Half-Yearly Exam'},
    {value: 'F', viewValue: 'Final Exam'}
  ];

  private classUpdate: Array<UpdateModel> = [
    new UpdateModel('CLASS', 'UNIT - 1 Starts 02-SEP-2020' ),
    new UpdateModel('CLASS', 'TextBooks are Issued' ),
    new UpdateModel('CLASS', 'Online Class Start at 10AM ' ),
    new UpdateModel('CLASS', 'COMPLETE MATHS HOMEWORK' ),
    new UpdateModel('CLASS', 'Class Teacher - Veena' )
  ];
  private schoolUpdate: UpdateModel[] = [
    new UpdateModel('SCHOOL', 'HAPPY GANESH CHATURDHI' ),
    new UpdateModel('SCHOOL', 'HAPPY INDEPENDENCE DAY' ),
    new UpdateModel('SCHOOL', 'ONLINE SCHOOL OPENS on 03-AUG-2020' ),
    new UpdateModel('SCHOOL', 'COVID BE SAFE' ),
    new UpdateModel('SCHOOL', '** Download KnowLad App **' )
  ];

  constructor() { }

  get classSection(){
    return this.sections;
  }

  get examType(){
    return this.examTypes;
  }

  get classUpdates(){
    return this.classUpdate;
  }

  get schoolUpdates(){
    return this.schoolUpdate;
  }
}
