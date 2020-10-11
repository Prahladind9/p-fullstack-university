import { Component, OnInit } from '@angular/core';
import {SegmentChangeEventDetail} from '@ionic/core';
import {UpdateModel} from '../../shared/model/update.model';
import {MaintenanceService} from '../../shared/service/maintenance.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.page.html',
  styleUrls: ['./teacher-home.page.scss'],
})
export class TeacherHomePage implements OnInit {

  schoolUpdate = true;
  classUpdate = false;
  schoolUpdates: Array<UpdateModel>;
  classUpdates: Array<UpdateModel>;
  updates: Array<UpdateModel>;

  constructor(private maintenanceService: MaintenanceService) {
    this.schoolUpdates = this.maintenanceService.schoolUpdates;
    this.classUpdates = this.maintenanceService.classUpdates;
  }

  ngOnInit() {
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'schoolUpdates') {
      this.schoolUpdate = !this.schoolUpdate;
      this.classUpdate = !this.classUpdate;
    }
    else if (event.detail.value === 'classUpdates') {
      this.schoolUpdate = !this.schoolUpdate;
      this.classUpdate = !this.classUpdate;
    }else {
    }
    /*if (event.detail.value === 'schoolUpdates') {
        this.schoolUpdates = this.maintenanceService.schoolUpdates;
        this.classUpdates = null;
    }
    else if (event.detail.value === 'classUpdates') {
        this.schoolUpdates = null;
        this.classUpdates = this.maintenanceService.classUpdates;
    }else {
    }*/
  }

}
