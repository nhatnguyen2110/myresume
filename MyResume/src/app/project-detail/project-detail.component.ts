import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../Services/common-service.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerHttpService } from '../Services/server-http.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  public project: any;
  public id = 0;
  constructor(
    private common: CommonServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private serverHttp: ServerHttpService
  ) { }

  async ngOnInit(): Promise<any> {
    if (!this.common.projectsData) {
      let data = await this.serverHttp.loadProjects();
      this.common.projectsData = data;
    }
    this.id = +this.route.snapshot.paramMap.get('id');
    this.project = _.find(this.common.projectsData.projects, { 'id': this.id });
    if (!this.project) {
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
