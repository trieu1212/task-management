import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task/task.service';
import { ITask } from '../../../core/models/task.interface';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../core/services/project/project.service';
import { IProject } from '../../../core/models/project.inerface';
import { formatDate } from '../../../core/utils/fomatDate';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
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

  }

  openEditDialog(id: string) {

  }

  deleteTask(id: string) {

  }
}
