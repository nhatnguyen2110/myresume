import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  public profile : any;
  constructor(
    private common: CommonServiceService
  ){
  }
  ngOnInit(): void {
    this.profile = this.common.profileData;
  }

}
