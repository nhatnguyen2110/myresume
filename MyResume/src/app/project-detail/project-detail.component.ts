import { Component, OnInit } from '@angular/core';
import  *  as  myProjects  from '../data/myProjects.json';
import { CommonServiceService } from '../Services/common-service.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  public project : any;
  public id = 0;
  constructor(
    private common: CommonServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(!this.common.projectsData)
    {
      this.common.projectsData = (myProjects as any).default;
    }
    this.id = +this.route.snapshot.paramMap.get('id');
    this.project = _.find(this.common.projectsData.projects,{'id':this.id});
    if(!this.project){
        this.router.navigate(['PageNotFound']);
    }
  }
  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

}
