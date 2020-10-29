import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../Services/common-service.service';
import  *  as  myProjects  from '../data/myProjects.json';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects : any;
  constructor(
    private router: Router,
    private common: CommonServiceService
  ) { }

  ngOnInit(): void {
    if(!this.common.projectsData)
    {
      this.common.projectsData = (myProjects as any).default;
    }
    this.projects = this.common.projectsData;
    
  }
  public mouseEnterProject(e)
  {
    e.srcElement.classList.add('in-down');
    e.srcElement.classList.remove('out-down');
    
  }
  public mouseLeaveProject(e)
  {
    e.srcElement.classList.remove('in-down');
    e.srcElement.classList.add('out-down');
    
  }
  public ViewProjectDetail(id)
  {
    this.router.navigate(['project',id]);
    
  }
}
