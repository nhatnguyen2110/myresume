import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../Services/common-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public profile : any;
  constructor(
    private common: CommonServiceService
  ){
  }
  ngOnInit(): void {
    this.profile = this.common.profileData;
  }

}
