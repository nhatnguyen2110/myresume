import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public profile: any;
  constructor(
    private common: CommonServiceService
  ) {
  }
  ngOnInit(): void {
    this.profile = this.common.profileData;
  }

}
