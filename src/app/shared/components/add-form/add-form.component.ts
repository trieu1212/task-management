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
  ){}

  ngOnInit(): void {
    this.getAllUser().subscribe(data => {
      this.users = data;
      this.initializeForm(); 
    });
  
    if (!this.users.length) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      status: this.data.type === 'task' 
        ? [this.data.formData?.status || 'To Do', Validators.required] 
        : null, 
      members: this.data.type === 'project' 
        ? [this.data.formData?.members || []] 
        : null, 
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
    return this.userService.getAllUser()
  }
}
