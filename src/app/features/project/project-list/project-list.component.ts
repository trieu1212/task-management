import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project/project.service';
import { IProject } from '../../../core/models/project.inerface';
import { UserService } from '../../../core/services/user/user.service';
import { IUser } from '../../../core/models/user.interface';

@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  projects: IProject[] = []
  userId: string = ''
  user: IUser | null = null

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user: any = localStorage.getItem('user')
    this.userId = user.id 
    if(this.userId) {
      this.userService.getUser(this.userId)
    }   
  }

  getAllProject() {
    return this.projectService.getAllProject().subscribe({
      next: (data) => {
        this.projects = data
      },
    })
  }
}
