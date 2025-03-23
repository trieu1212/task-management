import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from '../../../core/models/task.interface';

@Component({
  selector: 'app-edit-task-form',
  standalone: false,
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.scss'
})
export class EditTaskFormComponent implements OnInit {
  taskForm: FormGroup
  task:ITask = {
    id: '',
    name: '',
    description: '',
    status: "To Do",
    projectId:'',
    assignee: '',
    createdAt: new Date()
  }

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:string}
  ) {
    this.taskForm = formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      status: ['To Do']
    })
  }

  ngOnInit(): void {
      if(this.data.id) {
        this.getDetailTask(this.data.id)
      }
  }

  getDetailTask(id: string) {
    this.taskService.getDetailTask(id).subscribe(data => {
      this.task = data
      this.taskForm.patchValue({
        name: data.name,
        description: data.description,
        status: data.status
      })
    })
  }

  onSave() {
    if(this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
