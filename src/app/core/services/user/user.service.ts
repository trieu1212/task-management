import { Injectable} from '@angular/core';
import { ApiService } from '../api/api.service';
import { endpoint } from '../../constant/endpoint';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  constructor(
    private apiService: ApiService
  ) { }

  getUser(id: string) {
    return this.apiService.getById(endpoint.USER, id)
  }
}
