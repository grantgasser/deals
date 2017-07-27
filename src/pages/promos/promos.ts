import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RecommendPage } from '../pages';

import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'promos',
  templateUrl: 'promos.html'
})
export class PromosPage {
  selectedItem: any;
  shareEmail: boolean = false;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  image: 'assets/image/latop.jpg';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  sendEmail(){
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      this.shareEmail = true;
    }).catch(() => {
      // Sharing via email is not possible
    });

    if(this.shareEmail === true){
      // Share via email
      let address = prompt('Please enter the email address you\'d like to share the app with');
      this.socialSharing.shareViaEmail('Download the Dell Deals App for 15% off your first purchase!', 'Hi. Here\'s a Dell Deals discount.', [address]).then(() => {
        // Success!
        console.log('Email to ' + address + ' worked!');
      }).catch((error) => {
        // Error!
        console.log('Error!: ', error);
      });
    }
  }


  shareFacebook(){
    this.socialSharing.shareViaFacebook('Download the Dell Deals App for 15% off!', this.image,null)
    .then(() => {
      console.log('Message Sent');
    }).catch((error) => {
      console.log('Error!: ', error);
    });
  }

  sendSMS(){
    let number = prompt('Please enter the phone number');
    this.socialSharing.shareViaSMS('Download the Dell Deals App for 15% off!', number)
    .then(() => {
      console.log('SMS Text sent');
    }).catch((error) => {
      console.log('Error: ', error);
    });
  }


}
