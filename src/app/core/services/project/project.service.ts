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


}
