import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import {Router} from '@angular/router';
import {ModulesModel} from '../shared/model/modules.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public modulesList: Array<ModulesModel>;
  constructor(        private authService: AuthService,
                      private router: Router) {
    this.modulesList = this.authService.modules;
  }

  ngOnInit() {
    console.log(MenuComponent.name + ' > Modules List for the user ' + JSON.stringify(this.modulesList));
  }

  onAbout() {
    this.authService.logout();
    this.router.navigateByUrl('/about');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
