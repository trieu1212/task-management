import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectListComponent } from './features/project/project-list/project-list.component';
import { authGuard } from './core/guard/auth.guard';
import { guestGuard } from './core/guard/guest.guard';
import { RegisterComponent } from './features/auth/register/register.component';
import { TaskListComponent } from './features/task/task-list/task-list.component';
import { ProfileComponent } from './features/user/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[guestGuard] },
  { path: 'home', component: ProjectListComponent, canActivate:[authGuard] },
  { path: 'project/:id', component: TaskListComponent, canActivate:[authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[authGuard] },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
