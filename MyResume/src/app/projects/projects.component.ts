import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../Services/common-service.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects: any;
  constructor(
    private router: Router,
    private common: CommonServiceService,
    private serverHttp: ServerHttpService
  ) { }

  async ngOnInit(): Promise<any> {
    if (!this.common.projectsData) {
      let data = await this.serverHttp.loadProjects();
      this.common.projectsData = data;
    }
    this.projects = this.common.projectsData;
  }

  public mouseEnterProject(e) {
    e.srcElement.classList.add('in-down');
    e.srcElement.classList.remove('out-down');

  }
  public mouseLeaveProject(e) {
    e.srcElement.classList.remove('in-down');
    e.srcElement.classList.add('out-down');

  }
  public ViewProjectDetail(id) {
    this.router.navigate(['project', id]);

  }
}
