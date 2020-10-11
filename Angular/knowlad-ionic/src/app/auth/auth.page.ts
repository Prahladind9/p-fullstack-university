import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoadingController, MenuController} from '@ionic/angular';
import {Event, Router} from '@angular/router';
import {AuthService} from '../shared/service/auth.service';
import {UsersModel} from '../shared/model/users.model';
import * as Events from 'events';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLoading = false;
    isLogin = true;
    passwordHide = true;

    constructor(private userService: AuthService,
                private router: Router,
                public menuCtrl: MenuController,
                private loadingCtrl: LoadingController/*,
                private event: Events*/)
    {
    }

    logMethod(message: any) {
        console.log(AuthPage.name + ' > ' + message);
    }

    ngOnInit() {
    }

    onLogin() {
        this.isLoading = true;
        // this.userService.login();
        this.loadingCtrl
            .create({keyboardClose: true, message: 'Logging in...'})
            .then(loadingEl => {
                loadingEl.present();
                setTimeout(() => {
                    this.isLoading = false;
                    loadingEl.dismiss();

                    /*console.log('Before userLogged Event');
                    this.event.publish('userLogged');
                    console.log('After userLogged Event');*/
                    // this.event.publish('userLogged', this.userService.teachersModulesList);
                    this.router.navigateByUrl(this.userService.defaultUrl);
                }, 1500);
            });
    }

    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const userName = form.value.userName;
        const password = form.value.password;
        console.log(userName, password);

        this.userService.userLoginCredentialValidate(
            new UsersModel(null, null, null, null, null, null,
                userName, password, null, null)
        )
            .subscribe(
                response => {
                    this.logMethod('submitHandler - (2) - Set Session Call ' + response);
                    this.userService.setUserSession(response);
                    this.logMethod('submitHandler - (3) - Set Session Call Success ');
                    this.isLoading = false;
                },
                error => {
                    this.logMethod('userLoginCredentialValidate Error ' + error);
                    form.reset();
                    this.isLoading = false;
                }
            );


        form.reset();
        if (this.isLogin) {
            // Send a request to login servers
        } else {
            // Send a request to signup servers
        }
    }

    /*ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }*/

}
