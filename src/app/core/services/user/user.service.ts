import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { endpoint } from '../../constant/endpoint';
import { IUser } from '../../models/user.interface';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService
  ) { }

  getUser(id: string) {
    return this.apiService.getById<IUser>(endpoint.USER, id)
  }

  getAllUser() {
    return this.apiService.getAll<IUser>(endpoint.USER)
  }

  updateUser(id: string, data: Pick<IUser, "name" | "email">) {
    return this.apiService.update(endpoint.USER, id, data)
  }

  updateUserProjectCount(id: string, projectId: string, action: 'add' | 'remove') {
    return this.getUser(id).pipe(
      switchMap(user => {
        let projectIds: string[] = [...(user.projectIds || [])];
        if (action === 'add' && !projectIds.includes(projectId)) {
          projectIds.push(projectId);
        } else if (action === 'remove') {
          projectIds = projectIds.filter(id => id !== projectId);
        }

        return this.apiService.update(endpoint.USER, id, { projectIds })
      })
    )
  }
}
