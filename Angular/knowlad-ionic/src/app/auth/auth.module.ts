import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AuthPageRoutingModule} from './auth-routing.module';

import {AuthPage} from './auth.page';


const routes: Routes = [
  {
    path: '',
    component: AuthPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
