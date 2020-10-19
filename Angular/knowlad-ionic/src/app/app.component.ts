import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

import {MenuController, Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AuthService} from './shared/service/auth.service';
import {ModulesModel} from './shared/model/modules.model';
import Events from 'events';

import { Zoom } from '@ionic-native/zoom/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    SDK_KEY = 'cjx2Apa9NC3T2hskh7VTEJN91Jbp9QtfHOWA';
    SDK_SECRET = 'njTFtTortOfGr067CXcN7L8HDplYrUdqmsRe';

    // public modulesList: Array<ModulesModel>;
    // private event: Events;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public menuCtrl: MenuController,
        private authService: AuthService,
        private router: Router,
        private toastCtrl: ToastController,
        private zoomService: Zoom
    ) {
        this.initializeApp();
        console.log('constructor ' + JSON.stringify(this.authService.modules));

        // this.modulesList = this.authService.modules;

        /*this.event.subscribe('userLogged', (data) => {
            this.modulesList = data;
        });*/

        /*this.event.subscribe('userLogged', () => {
            console.log('userLogged Event Published Before');
            console.log('userLogged Event Published after > ' + JSON.stringify(this.modulesList));
            this.modulesList = this.authService.modules;
            console.log('userLogged Event Published after > ' + JSON.stringify(this.modulesList));
            // this.objLoggedUser.name = data.name;
        });*/
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            console.log('Platform ready');

            this.zoomService.initialize(this.SDK_KEY, this.SDK_SECRET)
                .then((success) => {
                    console.log(success);
                    this.presentToast(success);
                })
                .catch((error) => {
                    console.log(error);
                    this.presentToast(error);
                });
        });
    }

    ngOnInit() {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd && event.url === '/login') {
                this.menuCtrl.enable(false);
            }
        });

        // this.modulesList = this.authService.modules;
        // console.log(AppComponent.name + ' > Modules List for the user ' + JSON.stringify(this.modulesList));
    }

    async presentToast(text) {
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

}
