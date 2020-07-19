import {Component, OnInit} from '@angular/core';
import {UsersService} from '../service/data/users.service';
import {Event, Router} from '@angular/router';
import {ModulesModel} from '../service/model/modules.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName: string;
  modulesList: Array<ModulesModel>;
  selectedModule: string;

  constructor(private usersService: UsersService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.userName = this.usersService.getUserName();
    this.modulesList = this.usersService.getModulesList();
    this.logMethod('ngOnInit (0) - Welcome User ' + this.userName + ' & Modules List Fetched ' + JSON.stringify(this.modulesList));
    this.logMethod('ngOnInit (1) - Routed Url ' + this.route.url.replace('/',''));
    this.selectedModule = this.route.url.replace('/','');
  }

  logMethod(message: any) {
    console.log(NavbarComponent.name + ' > ' + message);
  }

  handleLogOut() {
    this.usersService.clearUserSession();
    this.route.navigate(['login']);
  }

}
