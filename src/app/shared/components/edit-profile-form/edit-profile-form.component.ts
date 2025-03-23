import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../core/models/user.interface';
import { UserService } from '../../../core/services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-form',
  standalone: false,
  templateUrl: './edit-profile-form.component.html',
  styleUrl: './edit-profile-form.component.scss'
})
export class EditProfileFormComponent implements OnInit {
  profileForm: FormGroup
  user: IUser = {
    id: '',
    name: "",
    email: '',
    projectIds:[]
  }

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:string}
  ){
    this.profileForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
      if(this.data.id) {
        this.getUserData(this.data.id)
      }
  }

  getUserData(id: string) {
    this.userService.getUser(id).subscribe(data => {
      this.user = data
    })
  }

  onSave() {
    if(this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
