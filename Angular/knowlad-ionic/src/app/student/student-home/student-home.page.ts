import {Component, OnInit} from '@angular/core';
import {SegmentChangeEventDetail} from '@ionic/core';
import {UpdateModel} from '../../shared/model/update.model';
import {MaintenanceService} from '../../shared/service/maintenance.service';
import {ModulesModel} from '../../shared/model/modules.model';
import {AuthService} from '../../shared/service/auth.service';

@Component({
    selector: 'app-student-home',
    templateUrl: './student-home.page.html',
    styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
    schoolUpdate = true;
    classUpdate = false;
    schoolUpdates: Array<UpdateModel>;
    classUpdates: Array<UpdateModel>;
    updates: Array<UpdateModel>;
    // modulesList: Array<ModulesModel>;

    constructor(private maintenanceService: MaintenanceService
                // ,private authService: AuthService
    ) {
        this.schoolUpdates = this.maintenanceService.schoolUpdates;
        this.classUpdates = this.maintenanceService.classUpdates;
        // this.modulesList = this.authService.modules;
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
