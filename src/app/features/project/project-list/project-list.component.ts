import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project/project.service';
import { IProject } from '../../../core/models/project.inerface';
import { UserService } from '../../../core/services/user/user.service';
import { IUser } from '../../../core/models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../../../shared/components/add-form/add-form.component';
import { Router } from '@angular/router';
import { TaskService } from '../../../core/services/task/task.service';
import { catchError, concatMap, of, switchMap, tap } from 'rxjs';

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
  username: string = ''

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user: any = localStorage.getItem('user')
    const jsonUser = JSON.parse(user)
    this.userId = jsonUser.id
    if(this.userId) {
      this.userService.getUser(this.userId).subscribe(data => {
        this.username = data.name || ""
      })
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

        this.projectService.addProject(prj).pipe(
          concatMap(res => this.userService.updateUserProjectCount(this.userId, res.name, 'add'))
        ).subscribe({
          next: () => {
            alert('Add project successfully!')
            this.getAllProject()
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    })
  }

  clickProject(id:string) {
    this.router.navigate([`project/${id}`])
  }

  deleteProject(event: Event, projectId: string) {
    event.stopPropagation();
    const isConfirmed = window.confirm("Do you want to delete this project?");
    if (isConfirmed) {
      this.projectService.deleteProject(projectId).pipe(
        concatMap(() => {
          console.log('✅ Project deleted:', projectId);
          return this.taskService.deleteManyTasksWithProjectId(projectId).pipe(
            catchError(err => {
              console.error('⚠️ Error deleting tasks:', err);
              return of(null);
            })
          );
        }),
        concatMap(() => {
          console.log('✅ Deleting tasks done, updating user project count...');
          return this.userService.updateUserProjectCount(this.userId, projectId, 'remove').pipe(
            catchError(err => {
              console.error('⚠️ Error updating user project count:', err);
              return of(null);
            })
          );
        })
      ).subscribe({
        next: () => {
          console.log('✅ All steps completed!');
          alert('Delete successfully!');
          this.getAllProject();
        },
        error: (err) => {
          console.error('❌ Error in subscription:', err);
        },
        complete: () => {
          console.log('🎯 Process completed!');
        }
      });
    }
  }
  
}
