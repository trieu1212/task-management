import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { endpoint } from '../../constant/endpoint';
import { ITask } from '../../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private apiService: ApiService
  ) { }

  getTaskByProjectId(projectId:string) {
    return this.apiService.getByFieldName<ITask>(endpoint.TASK, 'projectId', projectId)
  }
}
