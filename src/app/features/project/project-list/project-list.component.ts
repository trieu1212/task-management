import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project/project.service';
import { IProject } from '../../../core/models/project.inerface';
import { UserService } from '../../../core/services/user/user.service';
import { IUser } from '../../../core/models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../../../shared/components/add-form/add-form.component';

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
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const user: any = localStorage.getItem('user')
    this.userId = user.id 
    if(this.userId) {
      this.userService.getUser(this.userId)
      this.getAllProject()
    }   
  }

  getAllProject() {
    return this.projectService.getAllProject().subscribe({
      next: (data) => {
        this.projects = data
      },
    })
  }

  openDialog(type: 'project' | 'task') {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '600px',
      height: '400px',
      data: {
        type:type,
        formData:{
          
        }
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        const prj:Omit<IProject,"id"> = {
          name: result.name,
          description:result.description || '',
          members: result.members,
          ownerId: this.userId || '',
          createdAt: new Date()
        }

        this.projectService.addProject(prj).subscribe(data => {
          alert('Add project successfully!')
          this.getAllProject()
        })
      }
    })
  }
}
