import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IProject } from '../../models/project.inerface';
import { endpoint } from '../../constant/endpoint';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private apiService: ApiService
  ) { }

  getAllProject() {
    return this.apiService.getAll<IProject>(endpoint.PROJECT)
  }

  addProject(data: Omit<IProject, 'id'>) {
    return this.apiService.add<IProject>(endpoint.PROJECT, data)
  }

  deleteProject(id: string) {
    return this.apiService.delete<IProject>(endpoint.PROJECT, id)
  }

  getDetailProject(id:string) {
    return this.apiService.getById<IProject>(endpoint.PROJECT, id)
  }
}
