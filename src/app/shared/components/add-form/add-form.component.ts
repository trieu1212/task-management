import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../core/services/user/user.service';
import { IUser } from '../../../core/models/user.interface';

@Component({
  selector: 'app-add-form',
  standalone: false,
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})
export class AddFormComponent implements OnInit {
  form!: FormGroup
  statusList = ['To Do', 'In Progress', 'Done'];
  users: IUser[] = []

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'project' | 'task',
      formData: any
    }
  ) { 
    this.initializeForm()
  }

  ngOnInit(): void {
    this.getAllUser()
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      ...(this.data.type === 'task' && {
        status: [this.data.formData?.status || 'To Do', Validators.required],
      }),
      ...(this.data.type === 'project' && {
        members: [this.data.formData?.members || []],
      }),
    });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  getAllUser() {
    return this.userService.getAllUser().subscribe(data => {
      this.users = data
    })
  }
}
