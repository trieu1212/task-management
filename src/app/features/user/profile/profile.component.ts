import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../../core/models/user.interface';
import { EditProfileFormComponent } from '../../../shared/components/edit-profile-form/edit-profile-form.component';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userId: string = ''
  user: IUser = {
    id: '',
    name: "",
    email: '',
    projectIds:[]
  }

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const user:any = localStorage.getItem('user')
    const jsonUser = JSON.parse(user)
    this.userId = jsonUser.id 
    this.getUserData(this.userId)
  }

  getUserData(id: string) {
    this.userService.getUser(id).subscribe(data => {
      this.user = data
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditProfileFormComponent, {
      width: '600px',
      height: '400px',
      data: {
        id: this.userId
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        const data:Pick<IUser, "name" | "email"> = {
          name: res.name,
          email: res.email
        }

        this.userService.updateUser(this.userId, data).subscribe(data => {
          alert("Edit profile successfully!")
          this.getUserData(this.userId)
        })
      }
    })
  }
}
