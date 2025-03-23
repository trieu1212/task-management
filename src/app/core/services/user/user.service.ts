import { Injectable} from '@angular/core';
import { ApiService } from '../api/api.service';
import { endpoint } from '../../constant/endpoint';
import { IUser } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  constructor(
    private apiService: ApiService
  ) { }

  getUser(id: string) {
    return this.apiService.getById<IUser>(endpoint.USER, id)
  }

  getAllUser() {
    return this.apiService.getAll<IUser>(endpoint.USER)
  }
}
