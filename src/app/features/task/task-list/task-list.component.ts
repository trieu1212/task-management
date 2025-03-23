import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task/task.service';
import { ITask } from '../../../core/models/task.interface';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../core/services/project/project.service';
import { IProject } from '../../../core/models/project.inerface';
import { formatDate } from '../../../core/utils/fomatDate';
import { AddFormComponent } from '../../../shared/components/add-form/add-form.component';
import { EditTaskFormComponent } from '../../../shared/components/edit-task-form/edit-task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  user: any = null
  tasks: ITask[] = []
  projectId = ''
  project: IProject = {
    id: '',
    name: "",
    description: "",
    ownerId: "",
    members: [],
    createdAt: new Date()
  }
  displayedColumns: string[] = ['title', 'description', 'status', 'assignee','createdAt', 'actions'];
  formatDate = formatDate
  
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id') || ""
      if (this.projectId) {
        this.getTaskByProjectId(this.projectId)
        this.getProjectDetail(this.projectId)
      }
    })

    const storedUser: any = localStorage.getItem('user')
    this.user = JSON.parse(storedUser)
  }

  getTaskByProjectId(projectId: string) {
    this.taskService.getTaskByProjectId(this.projectId).subscribe(data => {
      this.tasks = data
    })
  }

  getProjectDetail(projectId: string) {
    this.projectService.getDetailProject(projectId).subscribe(data => {
      this.project = data
    })
  }

  getBack() {
    this.location.back()
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '600px',
      height: '400px',
      data: {
        type: 'task',
        formData:{}
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        const task: Omit<ITask, 'id'> = {
          name: result.title,
          description: result.description || '',
          status: result.status || 'To Do',
          projectId: this.projectId,
          assignee: this.user || "",
          createdAt: new Date()
        }

        this.taskService.addTask(task).subscribe(res => {
          alert('Add task successfully')
          this.getTaskByProjectId(this.projectId)
        })
      }
    })
  }

  openEditDialog(id: string) {
    console.log('click')
    const dialogRef = this.dialog.open(EditTaskFormComponent, {
      width: '600px',
      height: '400px',
      data: { id }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        const task: Pick<ITask, "name" | "description" | "status"> = {
          name: result.title,
          description: result.description,
          status: result.status
        }

        this.taskService.updateTask(id, task).subscribe(data => {
          alert('Edit task successfully!')
          this.getTaskByProjectId(this.projectId)
        })
      }
    })
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        alert('Delete task successfully!')
        this.getTaskByProjectId(this.projectId)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
