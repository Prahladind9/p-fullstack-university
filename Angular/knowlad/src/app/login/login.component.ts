import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../service/data/users.service';
import {ModulesModel} from '../service/model/modules.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginFormGroup: FormGroup;
  isLoading = false;

  // https://angular.io/api/forms/FormGroup

  constructor(private router: Router,
              private userService: UsersService) {
  }

  ngOnInit(): void {

    this.loginFormGroup = new FormGroup(
      {
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      }
    );
    this.logMethod('ngOnInit - (0) - FormData ' + this.loginFormGroup.value);
  }

  logMethod(message: any) {
    console.log(LoginComponent.name + ' > ' + message);
  }

  submitHandler() {
    this.logMethod('submitHandler - (1) - FormData ' + this.loginFormGroup.value);
    this.isLoading = true;

    this.userService.userLoginCredentialValidate(this.loginFormGroup.value)
      .subscribe(
        response => {
          this.logMethod('submitHandler - (2) - Set Session Call ' + response);
          this.userService.setUserSession(response);
          this.logMethod('submitHandler - (3) - Set Session Call Success ');

          this.logMethod('submitHandler - (4) - Fetch Modules Api call for the User ');
          this.userService.getModulesListApiCall()
            .subscribe(
              response => {
                this.logMethod('submitHandler - (5) - Modules Parsed ' + JSON.stringify(response));
                console.log(JSON.parse(JSON.stringify(response)) as Array<ModulesModel>);
                this.logMethod('submitHandler - (6) - Set Modules List ');
                this.userService.setModulesList(JSON.parse(JSON.stringify(response)) as Array<ModulesModel>);

                this.logMethod('submitHandler - (7) - Call HomePage ');
                this.isLoading = false;
                this.loginFormGroup.reset();
                // todo we'll change to role based later on
                // this.router.navigate(['Homepage']);
                this.router.navigate(['ResultTeacher']);

              },
              error => {
                this.logMethod('getModulesListApiCall Error ' + error);
                this.loginFormGroup.reset();
                this.isLoading = false;
              }
            );
        },
        error => {
          this.logMethod('userLoginCredentialValidate Error ' + error);
          this.loginFormGroup.reset();
          this.isLoading = false;
        }
      );


  }

}
