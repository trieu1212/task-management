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

  getDetailTask(id: string) {
    return this.apiService.getById<ITask>(endpoint.TASK, id)
  }

  getTaskByProjectId(projectId: string) {
    return this.apiService.getByFieldName<ITask>(endpoint.TASK, 'projectId', projectId)
  }

  deleteManyTasksWithProjectId(projectId: string) {
    return this.apiService.deleteManyFromFieldName<ITask>(endpoint.TASK, 'projectId', projectId)
  }

  addTask(data: Omit<ITask, 'id'>) {
    return this.apiService.add<ITask>(endpoint.TASK, data)
  }

  updateTask(id: string, data: Pick<ITask, "name" | "description" | "status">) {
    return this.apiService.update(endpoint.TASK, id, data)
  }

  deleteTask(id: string) {
    return this.apiService.delete<ITask>(endpoint.TASK, id)
  }
}
