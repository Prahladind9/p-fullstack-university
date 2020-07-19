import {Injectable} from '@angular/core';
import {API_URL} from '../constants/knowload.constants';
import {UsersModel} from '../model/users.model';
import {ModulesModel} from '../model/modules.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isLoggedIn = false;
  loggedInUser: UsersModel;
  modulesList: Array<ModulesModel>;

  constructor(private http: HttpClient) {
  }

  logMethod(message: any) {
    console.log(UsersService.name + ' > ' + message);
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

  getUserDetails() {
    this.logMethod('getUserDetails call');
    return this.loggedInUser;
  }

  getStudentId() {
    // todo: Student Implementation, we'll add the check later
    this.logMethod('getUserDetails call' + this.loggedInUser.userId);
    return this.loggedInUser.userId;
  }

  getUserName() {
    this.logMethod('getUserName call');
    // return this.loggedInUser.firstName + ' ' + this.loggedInUser.lastName;
    // return 'Student 1';
    return 'Teacher 1';
  }


  /*
  ############################################
  ########### Maintenance API Calls ##########
  ############################################
   */

  getModulesListApiCall() {
    this.logMethod('getModulesListApiCall call ');
    return this.http.get<ModulesModel>(`${API_URL}/modules/getModulesList`);
  }

  setModulesList(modulesListSet: Array<ModulesModel>) {
    this.logMethod('setModulesList >> ModuleList Check for User ' + this.loggedInUser.userName);
    if (this.loggedInUser.userName === 't') {
      for (let i = 0; i < modulesListSet.length; i++) {
        modulesListSet[i].moduleRoutePath = modulesListSet[i].moduleRoutePath + 'Teacher';
      }
    } else {
      //No Need to update the RoutePath
    }
    this.modulesList = modulesListSet;
    this.logMethod('setModulesList >> Final ModuleList --> ' + this.modulesList);
  }

  getModulesList() {
    this.logMethod('getModulesList');
    return this.modulesList;
  }
}
