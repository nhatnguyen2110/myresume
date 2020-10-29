import { Component } from '@angular/core';
import * as moment from 'moment'; 
import  *  as  myProfile  from './data/myProfile.json';
import { CommonServiceService } from './Services/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isShowNav = true;
  public isShowSharing = false;
  public currentYear = moment().year();
  public profile : any;
  constructor(
    private common: CommonServiceService
  ){
  }
  public ToggleNav(){
    this.isShowNav = !this.isShowNav;
  }
  public ToggleSharing(){
    this.isShowSharing = !this.isShowSharing;
  }
  ngOnInit(){
      if(!this.common.profileData){
        this.common.profileData = (myProfile as any).default;
      }
      this.profile = this.common.profileData;
  }
}
