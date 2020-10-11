import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import {Router} from '@angular/router';
import {ModulesModel} from '../shared/model/modules.model';

@Component({
  selector: 'app-a-sidemenu',
  templateUrl: './a-sidemenu.component.html',
  styleUrls: ['./a-sidemenu.component.scss'],
})
export class ASidemenuComponent implements OnInit {
  modulesList: Array<ModulesModel>;
  constructor( private authService: AuthService,
               private router: Router) {
    console.log('constructor ' + JSON.stringify(this.authService.modules));

    this.modulesList = this.authService.modules;
  }

  ngOnInit() {}

  onAbout() {
    this.authService.logout();
    this.router.navigateByUrl('/about');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }


}
