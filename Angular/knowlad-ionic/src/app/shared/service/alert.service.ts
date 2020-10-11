import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async presentConfirm(header: any, message: any, noCancel: any, yesConfirm: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: noCancel,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (NoCancel) => {
              resolve('No');
            }
          }, {
            text: yesConfirm,
            handler: (YesConfirm) => {
              resolve('Yes');
            }
          }
        ]
      });
      alert.present();
    });
  }
}
