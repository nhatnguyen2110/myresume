import { Component } from '@angular/core';
import * as moment from 'moment';
//import *  as  myProfile from './data/myProfile.json';
import { CommonServiceService } from './Services/common-service.service';
import { ServerHttpService } from './Services/server-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isShowNav = true;
  public isShowSharing = false;
  public currentYear = moment().year();
  public profile: any;
  constructor(
    private common: CommonServiceService,
    private serverHttp: ServerHttpService
  ) {
  }
  public ToggleNav() {
    this.isShowNav = !this.isShowNav;
  }
  public ToggleSharing() {
    this.isShowSharing = !this.isShowSharing;
  }
  async ngOnInit() {

    if (!this.common.profileData) {
      
      // this.serverHttp.getProfile().subscribe(data => {
      //   this.common.profileData = data;
      //   console.log('complete to call service');
      // });
      //this.common.profileData = (myProfile as any).default;
      let data = await this.serverHttp.loadProfile();
      this.common.profileData = data;
    }
    this.profile = this.common.profileData;
    //console.log('profile', this.profile);
  }
 
}
