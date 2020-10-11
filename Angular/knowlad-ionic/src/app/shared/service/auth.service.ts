import {Injectable} from '@angular/core';
import {ModulesModel} from '../model/modules.model';
import {UsersModel} from '../model/users.model';
import {API_URL} from '../constants/knowload.constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _userIsAuthenticated = true;
    private _userId = 'xyz';
    private _defaultUrl;
    private loggedInUser: UsersModel;
    private modulesList: Array<ModulesModel> =
        [
            {
                moduleId: 1,
                moduleName: 'Home',
                moduleRoutePath: 'student/tabs/student-home',
                moduleIcon: 'home-outline'
            },
            {
                moduleId: 2,
                moduleName: 'Result',
                moduleRoutePath: 'student/student-result',
                moduleIcon: 'medal-outline'
            },
            {
                moduleId: 3,
                moduleName: 'Attendance',
                moduleRoutePath: 'student/student-attendance',
                moduleIcon: 'calendar-outline'
            },
            {
                moduleId: 4,
                moduleName: 'Online Class',
                // moduleRoutePath: 'student/student-notes',
                moduleRoutePath: 'student/student-zoom',
                moduleIcon: 'videocam-outline'
            },
            {
                moduleId: 5,
                moduleName: 'Notes',
                // moduleRoutePath: 'student/student-notes',
                moduleRoutePath: 'student/tabs/student-home',
                moduleIcon: 'document-text-outline'
            },
            {
                moduleId: 6,
                moduleName: 'Assignment',
                // moduleRoutePath: 'student/student-assignment',
                moduleRoutePath: 'student/tabs/student-home',
                moduleIcon: 'briefcase-outline'
            },
            {
                moduleId: 7,
                moduleName: 'Counseling',
                // moduleRoutePath: 'student/student-counseling',
                moduleRoutePath: 'student/tabs/student-home',
                moduleIcon: 'people-outline'
            }
        ];


    constructor(private http: HttpClient) {
    }

    logMethod(message: any) {
        console.log(AuthService.name + ' > ' + message);
    }


    /*
    ####################################################
    #### Validate User Details & Session API Calls #####
    ####################################################
    */

    userLoginCredentialValidate(loginUser: UsersModel) {
        this.logMethod('userLoginCredentialValidate call for loginUser ' + loginUser);
        return this.http.post<UsersModel>(`${API_URL}/users/validateUser`, loginUser);
    }

    setUserSession(authenticatedUser: UsersModel) {
        // localStorage.setItem('AuthenticatedUserLocalStorage', username);
        this.logMethod('setUserSession call for authenticatedUser ' + authenticatedUser);
        sessionStorage.setItem('AuthenticatedUser', authenticatedUser.userName);
        this.loggedInUser = authenticatedUser;
        this.logMethod('setUserSession call Successful for user ' + JSON.stringify(this.loggedInUser));
    }

    clearUserSession() {
        this.logMethod('clearUserSession call');
        sessionStorage.removeItem('AuthenticatedUser');
    }


    /*
    ############################################
    #### User Details Maintenance API Calls #####
    ############################################
    */


    login() {
        this._userIsAuthenticated = true;
    }

    logout() {
        this._userIsAuthenticated = false;
    }

    get userIsAuthenticated() {
        return this._userIsAuthenticated;
    }

    get userId() {
        return this._userId;
    }

    get userDetails() {
        this.logMethod('getUserDetails call');
        return this.loggedInUser;
    }

    /*
    ############################################
    ########### Maintenance API Calls ##########
    ############################################
     */

    get defaultUrl() {
        // if (this.userDetails && this.userDetails.userName.includes('T_')) {
        if (this.userDetails && this.userDetails.userType.includes('TEACHER')) {
            this._defaultUrl = '/teacher/tabs/teacher-home';
        } else {
            // this._defaultUrl = '/teacher/tabs/teacher-home';
            this._defaultUrl = '/student/tabs/student-home';
        }
        return this._defaultUrl;
    }

    get teachersModulesList() {
        this.logMethod('teachersModulesList');
        // this.logMethod('setModulesList >> ModuleList Check for User ' + this.loggedInUser.userName);
        for (let i = 0; i < this.modulesList.length; i++) {
            this.modulesList[i].moduleRoutePath = this.modulesList[i].moduleRoutePath.replace('student', 'teacher');
            this.modulesList[i].moduleRoutePath = this.modulesList[i].moduleRoutePath.replace('student', 'teacher');
        }

        this.logMethod('teachersModulesList >> Final ModuleList --> ' + this.modulesList);
        return this.modulesList;
    }

    get studentsModulesList() {
        this.logMethod('studentsModulesList');
        return this.modulesList;
    }

    get modules() {
        this.logMethod('modules call');

        // if (this.userDetails && this.userDetails.userName.includes('T_')) {
        /*if (this.userDetails && this.userDetails.userType.includes('TEACHER')) {
            this.modulesList = this.teachersModulesList;
            return this.modulesList;
        } else if (this.userDetails && this.userDetails.userType.includes('STUDENT')) {
            // this.modulesList = this.teachersModulesList;
            this.modulesList = this.studentsModulesList;
            return this.modulesList;
        }*/

        // return this.modulesList = this.studentsModulesList;
        return this.modulesList = this.teachersModulesList;

    }

    /*
    ############################################
    ########### Unused API Calls ##########
    ############################################
     */

    getModulesListApiCall() {
        this.logMethod('getModulesListApiCall call ');
        // return this.http.get<ModulesModel>(`${API_URL}/modulesList/getModulesList`);
    }

    /*get userName() {
       this.logMethod('getUserName call');
       return this.loggedInUser.userName;
    }

    get studentId() {
       // todo: Student Implementation, we'll add the check later
       this.logMethod('getUserDetails call' + this.loggedInUser.userId);
       return this.loggedInUser.userId;
    }*/

}
