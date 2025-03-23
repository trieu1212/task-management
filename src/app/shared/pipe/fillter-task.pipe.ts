import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../../core/models/task.interface';

@Pipe({
  name: 'fillterTask',
  standalone: false
})
export class FillterTaskPipe implements PipeTransform {

  transform(tasks: ITask[], status: string): ITask[] {
    if(!tasks) return []
    return tasks.filter(task => task.status === status)
  }
}
